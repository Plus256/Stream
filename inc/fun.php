<?php
require_once("cnf.php");

if(isset($_GET['save_stream'])){
  if(!empty($_POST['fb']) || !empty($_POST['twt'])){//at least one source
    if(!empty($_POST['name'])){
      $name=cleanInput($_POST['name']);
    }
    else{//get last id from table
      $q=mysqli_query($conn, "select id from stream order by id desc limit 1");
      if(mysqli_num_rows($q)>0){
        $r=mysqli_fetch_assoc($q);
        $next_stream_id=$r['id']+1;
        $name="stream".$next_stream_id;
      }
      else{//no stream in db
        $name="stream1";
      }
    }
    $user_id=$_SESSION['logged'];
    $q=mysqli_query($conn, "insert into stream (name, user) values ('$name', $user_id)");
    if($q){
      $stream=mysqli_insert_id($conn);//mysql_query("select last_insert_id() into @stream");
      if(!empty($_POST['fb']) && !empty($_POST['twt'])){//if both sources are provided
        $fb=cleanInput($_POST['fb']);
        $twt=cleanInput($_POST['twt']);

        $q=mysqli_query($conn, "insert into source (type, url) values (0, '$fb')");//insert fb first
        if($q){
          $fb_src=mysqli_insert_id($conn);//mysql_query("select last_insert_id() into @source");
          $q=mysqli_query($conn, "insert into sourcetostream (source, stream) values ($fb_src, $stream)");
          if($q){//then twitter
            $q=mysqli_query($conn, "insert into source (type, url) values (1, '$twt')");
            if($q){
              $twt_src=mysqli_insert_id($conn);//mysql_query("select last_insert_id() into @source");
              $q=mysqli_query($conn, "insert into sourcetostream (source, stream) values ($twt_src, $stream)");
              if($q){
                echo "1";
              }
              else{
                echo mysqli_error($conn);
              }
            }
            else{
              echo "0";
            }
          }
          else{
            echo mysqli_error($conn);
          }
        }
        else{
          echo "0";
        }
      }
      elseif(!empty($_POST['twt']) && empty($_POST['fb'])){//if twitter alone is provided
        $twt=cleanInput($_POST['twt']);
        $q=mysqli_query($conn, "insert into source (type, url) values (1, '$twt')");
        if($q){
          $twt_src=mysqli_insert_id($conn);//mysql_query("select last_insert_id() into @source");
          $q=mysqli_query($conn, "insert into sourcetostream (source, stream) values ($twt_src, $stream)");
          if($q){
            echo "1";
          }
          else{
            echo mysqli_error($conn);
          }
        }
        else{
          echo "0";
        }
      }
      else{//if facebook alone is provided
        $fb=cleanInput($_POST['fb']);
        $q=mysqli_query($conn, "insert into source (type, url) values (0, '$fb')");
        if($q){
          $fb_src=mysqli_insert_id($conn);//mysql_query("select last_insert_id() into @source"); BETTER THAN THIS <-
          $q=mysqli_query($conn, "insert into sourcetostream (source, stream) values ($fb_src, $stream)");
          if($q){
            echo "1";
          }
          else{
            echo mysqli_error($conn);
          }
        }
        else{
          echo "0";
        }
      }
    }
	}
	else{
		echo "2";
	}
}

if(isset($_GET['signup_req'])){
  if(!empty($_POST['email']) && !empty($_POST['password'])){
		$mail_check=spamCheck($_POST['email']);
		if($mail_check==false){
			echo "1";
		}
		else{
		    $email=cleanInput($_POST['email']);
        $password=cleanInput($_POST['password']);
		    $q=mysqli_query($conn, "select email from user where email='$email'");
		    if(mysqli_num_rows($q)>0){
		    	echo "0";
		    }
		    else{
          $hash=hash('sha256', $password);
          $vkey=hash('sha256', $email.uniqid(rand()));
		    	$q=mysqli_query($conn, "insert into user (email, pwd, vkey, dp) values ('$email', '$hash', '$vkey', 1)");
			    if($q){//successful sign up
			    	$to=$email;
			    	$frm="Stream<stream@plus256.com>";
			    	$sbj="Welcome";

            $msg='<div style="text-align:center;">';
            $msg.='<div>';
          	$msg.='Thank you for Signing up.';
          	$msg.='</div>';

            $msg.='<div>';
          	$msg.='It\'d be nice if you created a username, and also added a dp, as soon as you got in.';
          	$msg.='</div>';

            $msg.='<a href="http://plus256.com/stream/verify.php?vkey='.$vkey.'" style="display:inline-block; text-decoration:none; padding:1em 5em; background:#FBAE17; color:#FFF; margin:3em 0; border:1px solid #F90;">';
          	$msg.='PROCEED';
          	$msg.='</a>';
            $msg.='</div>';

			    	sendMsg($to, $frm, $sbj, $msg);
			    }
		    }
		}
	}
	else{
		echo "4";
	}
}

if(isset($_GET['signin_req'])){
  if(!empty($_POST['email']) && !empty($_POST['password'])){
    $email=cleanInput($_POST['email']);
    $password=cleanInput($_POST['password']);
    $q=mysqli_query($conn, "select email from user where email='$email'");
    if(mysqli_num_rows($q)==0){
      echo "0";//no email in db
    }
    else{//login
      $q=mysqli_query($conn, "select status from user where email='$email'");
      $r=mysqli_fetch_assoc($q);
      $status=$r['status'];
      if($status==1){//email confirmed
        $hash=hash('sha256', $password);
        $q=mysqli_query($conn, "select id from user where email='$email' and pwd='$hash'");
        if(mysqli_num_rows($q)>0){
          echo "1";//redirect and set session
          $r=mysqli_fetch_assoc($q);
      		$_SESSION['logged']=$r['id'];
        }
        else{
          echo "3";//mismatch
        }
      }
      else{
        echo "4";//confirm email
      }
    }
	}
	else{
		echo "2";//missing field
	}
}

//message API
if(isset($_GET['send_msg'])){
    if(!empty($_POST['frm'])){
		$mail_check=spamCheck($_POST['frm']);
		if($mail_check==false){
			echo "0";
		}
		else{
			if(!empty($_POST['msg']) && $_POST['msg']!="Write Message Here..." && preg_match("/^[0-9a-zA-Z]+/", $_POST['msg'])){
				$to="stream@plus256.com";
				$frm=cleanInput($_POST['frm']);
				$sbj=cleanInput($_POST['sbj']);
				$msg=cleanInput($_POST['msg']);
				sendMsg($to, $frm, $sbj, $msg);
			}
			else{
				echo "1";
			}
		}
	}
	else{
		echo "0";
	}
}

function spamCheck($field){
	//sanitize email
	$field=filter_var($field, FILTER_SANITIZE_EMAIL);
	//validate email
	if(filter_var($field, FILTER_VALIDATE_EMAIL)){
		return true;
	}
	else{
		return false;
	}
}

function cleanInput($data){
	$data = trim($data);
	$data = stripslashes($data);
	$data = strip_tags($data, "<br>");
	return $data;
}

if(isset($_GET['fb_page_feed'])){
  $fb_page_id = "335422937918";
  $access_token = "482219788583361|hKl9uoyyU6FwifKMLd-mWLsGR1Y";
  $fields = "id,message,full_picture,link,name,description,type,icon,created_time,from,object_id";//use full_picture instead of picture
  $limit = 5;


  //$profile_photo_src = "https://graph.facebook.com/".$fb_page_id."/picture?type=square";


  $json_link = "https://graph.facebook.com/v2.4/".$fb_page_id."/feed?access_token=".$access_token."&fields={$fields}&limit={$limit}";

  try{


  $ch = curl_init();
  curl_setopt ($ch, CURLOPT_URL, $json_link);
  curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 5);
  curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
  $json = curl_exec($ch);
  if (curl_errno($ch)) {
    echo curl_error($ch);
    echo "\n<br />";
    $json = '';
  } else {
    curl_close($ch);
  }

  if (!is_string($json) || !strlen($json)) {
  echo "Failed to get contents.";
  $json = '';
  }

  echo $json;



  } catch(Facebook\Exceptions\FacebookResponseException $e) {
    echo 'Graph returned an error: ' . $e->getMessage();
    exit;
  } catch(Facebook\Exceptions\FacebookSDKException $e) {
    echo 'Facebook SDK returned an error: ' . $e->getMessage();
    exit;
  }
}

function elapsedTime($t_stamp){
	$occurred=strtotime($t_stamp)-(1*60*60);//subtract 1 hour to cater for Ugandan Time Zone
	$diff=time()-$occurred;
	if($diff<60){
		$elapsed=$diff;
		if($elapsed==1){
			$elapsed=$elapsed." Second";
		}
		else{
			$elapsed=$elapsed." Seconds";
		}
	}
	elseif($diff>=60 && $diff<(60*60)){
		$elapsed=floor($diff/(60));
		if($elapsed==1){
			$elapsed=$elapsed." Minute";
		}
		else{
			$elapsed=$elapsed." Minutes";
		}
	}
	elseif($diff>=(60*60) && $diff<(60*60*24)){
		$elapsed=floor($diff/(60*60));
		if($elapsed==1){
			$elapsed=$elapsed." Hour";
		}
		else{
			$elapsed=$elapsed." Hours";
		}
	}
	elseif($diff>=(60*60*24) && $diff<(60*60*24*7)){
		$elapsed=floor($diff/(60*60*24));
		if($elapsed==1){
			$elapsed=$elapsed." Day";
		}
		else{
			$elapsed=$elapsed." Days";
		}
	}
	else{
		$elapsed=date("M jS, Y", $occurred);
	}
	return $elapsed;
}

function sendMsg($to,$frm, $sbj, $msg){
	//msg lines should not exceed 70 characters. it's a PHP rule, so we wrap
	$msg=wordwrap($msg, 70);
	$msg_fot='Copyright &copy; '.date('Y').' <a href="http://www.plus256.com" target="_NEW">Plus256 Network, Ltd</a>';
	//HTML message formatting/////////////////////////////////////////////////////////////////////////////////////////////////
	$html_msg='<html>';
	$html_msg.='<head>';
	/////////The Style Sheet//////////////////////////////////////////////////////////////////
	$html_msg.='<style type="text/css">';
	$html_msg.='a{text-decoration:none; color:#09F;} a:hover{text-decoration:underline;}';
	$html_msg.='</style>';
	/////////////////////////////////////////////////////////////////////////////////////////
	$html_msg.='</head>';
	$html_msg.='<body style="width:70%; margin:auto; font-family:Verdana, Geneva, sans-serif; font-size:120%; color:#036; background:#FFF;">';
	///////////////////
	$html_msg.='<div style="padding:10px; background:rgb(251, 174, 23); color:#FFF; font-weight:bold; border-radius:10px 10px 0 0; -moz-border-radius:10px 10px 0 0; -webkit-border-radius:10px 10px 0 0;">';
	$html_msg.=$sbj;
	$html_msg.='</div>';
	///////////////////////////
	$html_msg.='<div style="padding:10px;">';
	$html_msg.=$msg;
	$html_msg.='</div>';
	//////////////////////////
	$html_msg.='<div style="padding:10px; font-size:85%; color:#A1A1A1; text-align:center; border:1px solid #EAEAEA; border-radius:0 0 10px 10px; -moz-border-radius:0 0 10px 10px; -webkit-border-radius:0 0 10px 10px;">';
	$html_msg.=$msg_fot;
	$html_msg.='</div>';
	//////////////////////////
	$html_msg.='</body>';
	$html_msg.='</html>';
	/////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
	$hed='From: '.$frm.''."\r\n";
	$hed.='Reply-To: '.$frm.''."\r\n";
	//headers to send HTML email
	$hed.='MIME-Version: 1.0'."\r\n";
	$hed.='Content-type: text/html; charset=iso-8859-1'."\r\n";
	if(mail($to, $sbj, $html_msg, $hed)){
		echo "2";
	}
	else{
		echo "3";
	}
}

if(isset($_GET['fetch_stream'])){
  $user_id=$_SESSION['logged'];
  $data=array();
	$q=mysqli_query($conn, "select * from stream where user=$user_id");
  if($q){
    $qt=mysqli_query($conn, "select id from stream");//total records
  	$tot_r=mysqli_num_rows($qt);
  	while($r=mysqli_fetch_assoc($q)){
  		$id=$r['id']; $name=$r['name']; $status=$r['status']; $created=$r['created'];
  		$created=elapsedTime($created);
      switch($status){
        case 0: $status="Draft"; break;
        case 1: $status="Live"; break;
      }
  		$rec=array("id"=>$id, "name"=>$name, "status"=>$status, "created"=>$created, "tot_r"=>$tot_r);
  		array_push($data, $rec);
  	}
  	echo json_encode($data);
  }
}

?>
