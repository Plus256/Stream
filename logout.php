<?php
require_once("inc/cnf.php");
$_SESSION = array();
session_destroy();
$succ="Account Secure";
header('Location: index.php?succ='.$succ.'');
?>
