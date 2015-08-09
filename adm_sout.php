<?php
require_once("cnf.php");
$_SESSION = array();
session_destroy();
$succ=2;
header('Location: adm.php?succ='.$succ.'');
?>
