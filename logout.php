<?php
require_once("inc/cnf.php");
$_SESSION = array();
session_destroy();
header('Location: ./');
?>
