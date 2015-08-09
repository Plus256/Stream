<?php
require_once("cnf.php");
require_once("mail.php");

if(isset($_GET['news_subscr'])){
	newsSubscr();
}

function newsSubscr(){
	if(!empty($_POST['email'])){
		$mail_check=spamCheck($_POST['email']);
		if($mail_check==false){
			echo "Make sure the Address is Valid.";
		}
		else{
		    $email=cleanInput($_POST['email']);
		    $q=mysql_query("select email from news_l where email='$email'");
		    if(mysql_num_rows($q)>0){
		    	echo "0";
		    }
		    else{
		    	$q=mysql_query("insert into news_l (email) values ('$email')");
			    if($q){
			    	echo "1";
			    	/*$to=$email;
			    	$frm="info@techshule.com";
			    	$sbj="TechShule Newsletter Subscription";
			    	$msg="Thank you for Subscribing to the Best Tech News and Information on Startups across Africa.";
			    	if(sendMsg($to, $frm, $sbj, $msg)){
			    		echo "1";
			    	}*/
			    }
		    }
		}
	}
	else{
		echo "2";
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
?>