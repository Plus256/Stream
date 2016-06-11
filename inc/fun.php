<?php
require_once('ob_ses.php');
require_once('db.php');

if(isset($_GET['save_stream'])){
  if(!empty($_POST['keywords'])){//at least one source
    $keywords=cleanInput($_POST['keywords']);
    $user_id=$_SESSION['logged'];
    $q=mysqli_query($conn, "insert into stream (src, user) values ('$keywords', $user_id)");
    if($q){
      echo "1";
    }
    else{print mysqli_error($conn);}
	}
	else{
		echo "0";
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
	    	$to=$email;
	    	$frm="stream@plus256.com";
	    	$frm_name="Stream";
	    	$sbj="Engage your Audience";
	
	      $msg='<div style="text-align:center;">';
	      $msg.='<p>';
	    	$msg.='Almost Done...';
	    	$msg.='</p>';
	    	
	      $msg.='<p>';
	    	$msg.='Engage your Audience and Follow your Favourites with Realtime Hashtag Streaming.';
	    	$msg.='</p>';
	    	
	    	$msg.='<p style="padding:10px; font-weight:bold;">';
	    	$msg.='Made for Home. Made for Work. Made for You.';
	    	$msg.='</p>';
	    	
	    	//cant we have sample feeds in the mail. the latest of trending. (one row - of 3/4)
	
	      $msg.='<p>';
	    	$msg.='You could start by following some of the trending topics.';
	    	$msg.='</p>';
	    	
	    	$msg.='<p style="font-weight:bold;">';
	    	$msg.='#UgPetition16, #MbabaziPetition, #StartupUganda';
	    	$msg.='</p>';
	
	      $msg.='<a href="http://stream.ug/verify.php?vkey='.$vkey.'" style="display:inline-block; text-decoration:none; padding:1em 5em; background:#FBAE17; color:#FFF; margin:3em 0; border:1px solid #F90;">';
	    	$msg.='PROCEED';
	    	$msg.='</a>';
	      $msg.='</div>';
	
	    	$mail_return=sendMsg($to, $frm, $frm_name, $sbj, $msg);//get returned value from function
	    	switch($mail_return){
	    		case 2:
    			//mail sent to address - add to DB
		    	$q=mysqli_query($conn, "insert into user (email, pwd, vkey, dp) values ('$email', '$hash', '$vkey', 1)");
    			if($q){//successful sign up
    				echo "2";
    			}
    			else{echo mysqli_error($conn);}
	    		break;
	    		case 3:
    			echo "3";
    			//mail not sent
	    		break;
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

function sendMsg($to, $frm, $frm_name, $sbj, $msg){
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
	$html_msg.='<div style="text-align:center; padding:10px; background:rgb(118, 105, 104); color:#FFF; font-weight:bold; border-radius:10px 10px 0 0; -moz-border-radius:10px 10px 0 0; -webkit-border-radius:10px 10px 0 0;">';
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
	require('../vendor/autoload.php');
	$sendgrid_apikey='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';
	$sendgrid = new SendGrid($sendgrid_apikey);
	$email = new SendGrid\Email();
	$email
	    ->addTo($to)
	    ->setFrom($frm)
	    ->setFromName($frm_name)
	    ->setSubject($sbj)
	    ->setText($msg)
	    ->setHtml($html_msg)
	;
	
	try{
	    $sendgrid->send($email);
	    return 2;
	}
	catch(\SendGrid\Exception $e){
	    return 3;
	    /*echo $e->getCode();
	    foreach($e->getErrors() as $er) {
	        echo $er;
	    }*/
	}
}

if(isset($_GET['fetch_stream'])){
  $user_id=$_SESSION['logged'];
  $data=array();
	$q=mysqli_query($conn, "select * from stream where user=$user_id order by id desc");
  if($q){
    $qt=mysqli_query($conn, "select id from stream");//total records
  	$tot_r=mysqli_num_rows($qt);
  	while($r=mysqli_fetch_assoc($q)){
  		$id=$r['id']; $keywords=$r['src']; $status=$r['status']; $created=$r['created'];
  		$created=elapsedTime($created);
      switch($status){
        case 0: $status="Draft"; break;
        case 1: $status="Live"; break;
      }
  		$rec=array("id"=>$id, "keywords"=>$keywords, "status"=>$status, "created"=>$created, "tot_r"=>$tot_r);
  		array_push($data, $rec);
  	}
  	echo json_encode($data);
  }
}

if(isset($_GET['read_stream']) && isset($_GET['id'])){
  $stream_id=$_GET['id'];
  $user_id=$_SESSION['logged'];
  $data=array();
  $sources=array();
	$q=mysqli_query($conn, "select * from stream where id=$stream_id");
  if($q){
    $r=mysqli_fetch_assoc($q);
    $id=$r['id']; $keywords=$r['src']; $status=$r['status']; $created=$r['created'];
    $created=elapsedTime($created);
    $rec=array("id"=>$id, "keywords"=>$keywords, "status"=>$status, "created"=>$created);
    array_push($data, $rec);
  	echo json_encode($data);
  }
}










if(isset($_GET['get_trending'])){
  $data=array();
	$q=mysqli_query($conn, "select * from status where stream=23 order by id desc limit 20");
  while($r=mysqli_fetch_assoc($q)){
    $id=$r['id']; $json=$r['json']; $user=$r['author'];
    $rec=array("id"=>$id, "json"=>$json, "user"=>$user);
    array_push($data, $rec);
  }
  echo json_encode($data);
}

if(isset($_GET['get_latest']) && isset($_GET['last_id'])){
  $last_id=$_GET['last_id'];
  $data=array();
	$q=mysqli_query($conn, "select * from status where stream=23 and id>$last_id");
  while($r=mysqli_fetch_assoc($q)){
    $id=$r['id']; $json=$r['json']; $user=$r['author'];
    $rec=array("id"=>$id, "json"=>$json, "user"=>$user);
    array_push($data, $rec);
  }
  echo json_encode($data);
}



if(isset($_GET['user_stream_display']) && isset($_GET['id'])){
  $stream_id=$_GET['id'];
  $data=array();
	$q=mysqli_query($conn, "select t.id, t.json from status as t join stream as s join user as u on t.stream=s.id and t.author=u.id where s.id=$stream_id order by t.id desc limit 20");
  while($r=mysqli_fetch_assoc($q)){
    $id=$r['id']; $json=$r['json'];
    $rec=array("id"=>$id, "json"=>$json);
    array_push($data, $rec);
  }
  echo json_encode($data);
}

if(isset($_GET['user_stream_display_latest']) && isset($_GET['last_id']) && isset($_GET['stream_id'])){
  $last_id=$_GET['last_id'];
  $stream_id=$_GET['stream_id'];
  $data=array();
	$q=mysqli_query($conn, "select t.id, t.json from status as t join stream as s join user as u on t.stream=s.id and t.author=u.id where s.id=$stream_id and t.id>$last_id order by t.id asc");
  while($r=mysqli_fetch_assoc($q)){
    $id=$r['id']; $json=$r['json'];
    $rec=array("id"=>$id, "json"=>$json);
    array_push($data, $rec);
  }
  echo json_encode($data);
}

if(isset($_GET['user_stream_check_latest']) && isset($_GET['last_id']) && isset($_GET['stream_id'])){
  $last_id=$_GET['last_id'];
  $stream_id=$_GET['stream_id'];
  $data=array();
	$q=mysqli_query($conn, "select t.id from status as t join stream as s join user as u on t.stream=s.id and t.author=u.id where s.id=$stream_id and t.id>$last_id");
  while($r=mysqli_fetch_assoc($q)){
    $id=$r['id'];
    $rec=array("id"=>$id);
    array_push($data, $rec);
  }
  echo json_encode($data);
}


?>
