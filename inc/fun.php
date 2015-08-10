<?php
require_once("cnf.php");
//message API
if(isset($_GET['send_msg'])){
    if(!empty($_POST['frm'])){
		$mail_check=spamCheck($_POST['frm']);
		if($mail_check==false){
			echo '{"ret":"0"}';
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
				echo '{"ret":"1"}';
			}
		}
	}
	else{
		echo '{"ret":"0"}';
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
?>
