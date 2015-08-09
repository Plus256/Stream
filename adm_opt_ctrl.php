<?php
$opt=$_GET['option'];
switch($opt){	
	case "Ads":
	require_once("adm_ad.php");
	break;
	
	case "Shules":
	require_once("adm_shule.php");
	break;
	
	case "Events":
	require_once("adm_crs.php");
	break;
	
	case "Jobs":
	require_once("adm_tics.php");
	break;
	
	case "Users":
	require_once("adm_users.php");
	break;
}
?>