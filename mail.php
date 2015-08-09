<?php
function sendMsg($to,$frm, $sbj, $msg){
	//msg lines should not exceed 70 characters. it's a PHP rule, so we wrap
	$msg=wordwrap($msg, 70);
	$msg_fot='Copyright &copy; '.date('Y').' <a href="http://www.plus256.com" target="_NEW">Plus256 Network</a>';
	//HTML message formatting/////////////////////////////////////////////////////////////////////////////////////////////////
	$html_msg='<html>';
	$html_msg.='<head>';
	/////////The Style Sheet//////////////////////////////////////////////////////////////////
	$html_msg.='<style type="text/css">';
	$html_msg.='a{text-decoration:none; color:#09F;} a:hover{text-decoration:underline;}';
	$html_msg.='body{width:70%; margin:auto; font-family:Verdana, Geneva, sans-serif; font-size:120%; color:#036; background:#FFF;}';
	$html_msg.='#msg_hed{padding:10px; background:rgb(255, 0, 0); color:#FFF; font-weight:bold;}';
	$html_msg.='#msg_hed{border-radius:10px 10px 0 0; -moz-border-radius:10px 10px 0 0; -webkit-border-radius:10px 10px 0 0;}';
	$html_msg.='#msg_bod{padding:10px;}';
	$html_msg.='#msg_fot{padding:10px; font-size:85%; color:#A1A1A1; text-align:center; border:1px solid #EAEAEA;}';
	$html_msg.='#msg_fot{border-radius:0 0 10px 10px; -moz-border-radius:0 0 10px 10px; -webkit-border-radius:0 0 10px 10px;}';
	$html_msg.='</style>';
	/////////////////////////////////////////////////////////////////////////////////////////
	$html_msg.='</head>';
	$html_msg.='<body>';
	///////////////////
	$html_msg.='<div id="msg_hed">';
	$html_msg.=$sbj;
	$html_msg.='</div>';
	///////////////////////////
	$html_msg.='<div id="msg_bod">';
	$html_msg.=$msg;
	$html_msg.='</div>';
	//////////////////////////
	$html_msg.='<div id="msg_fot">';
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
		echo '{"ret":"2"}';
	}
	else{
		echo '{"ret":"3"}';
	}
}
?>