<?php
if(isset($_POST['adm_sup_att'])){
	$fname=mysql_real_escape_string($_POST['fname']);
	$lname=mysql_real_escape_string($_POST['lname']);
	$uname=mysql_real_escape_string($_POST['uname']);
	$pwd=mysql_real_escape_string($_POST['pwd']);
	$cpwd=mysql_real_escape_string($_POST['cpwd']);
	if(empty($fname) || empty($lname) || empty($uname) || empty($pwd)){
		$err=1;
		header('Location: '.$_SERVER['PHP_SELF'].'?err='.$err.'');
	}

	else{
		if($pwd!=$cpwd){
		$err=2;
		header('Location: '.$_SERVER['PHP_SELF'].'?err='.$err.'');
		}
		else{
			$hash=hash('sha256', $pwd);
			$q=mysql_query("insert into pic (src) values ('logo.png')");
			mysql_query("select last_insert_id() into @pic");
			$q=mysql_query("insert into user (fname, lname, uname, pic, hash, level) values ('$fname', '$lname', '$uname', @pic, '$hash', 1)");
			if($q){
				$_SESSION['adm_logged']=mysql_insert_id();
				$succ=1;
				header('Location: '.$_SERVER['PHP_SELF'].'?succ='.$succ.'');
			}else{echo mysql_error();}
		}
	}
}
?>