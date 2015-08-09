<?php
$uname=mysql_real_escape_string($_POST['uname']);
$pwd=mysql_real_escape_string($_POST['pwd']);
$hash=hash('sha256', $pwd);
$q=mysql_query("select * from user where uname='$uname'");
if(mysql_num_rows($q)<1){
	$err=1;
	header('Location: '.$_SERVER['PHP_SELF'].'?err='.$err.'');
}
else{
	$q=mysql_query("select * from user where hash='$hash' and uname='$uname'");
	if(mysql_num_rows($q)>0){
		$r=mysql_fetch_assoc($q);
		$_SESSION['adm_logged']=$r['id'];
		header('Location: '.$_SERVER['PHP_SELF'].'');
	}
	else{
		$err=2;
		header('Location: '.$_SERVER['PHP_SELF'].'?err='.$err.'');
	}
}
?>