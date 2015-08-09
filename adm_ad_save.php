<?php
$shule_title=mysql_real_escape_string($_POST['shule_title']);
$shule_cover=$_FILES['shule_cover']['name'];
$shule_cat=mysql_real_escape_string($_POST['shule_cat']);
$shule_ctype=mysql_real_escape_string($_POST['shule_ctype']);
$shule_status=mysql_real_escape_string($_POST['shule_status']);
$shule_body=mysql_real_escape_string($_POST['shule_body']);
$shule_author=$_SESSION['adm_logged'];
$upload=move_uploaded_file($_FILES['shule_cover']['tmp_name'], "./img/".$_FILES['shule_cover']['name']);
if($upload){
	$q=mysql_query("insert into pic (src) values ('$shule_cover')");
	if($q){
		mysql_query("select last_insert_id() into @shule_cover");
		$q=mysql_query("insert into shule (title, cover, body, author, status, category, ctype) values ('$shule_title', @shule_cover, '$shule_body', $shule_author, $shule_status, $shule_cat, $shule_ctype)");
		if($q){
			header('Location:'.$_SERVER['PHP_SELF'].'?option=Shules');
		}
		else{echo mysql_error();}
	}
}
else{
	print_r($_FILES);
}
?>