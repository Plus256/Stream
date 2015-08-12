<?php
require_once("inc/hed.php");
require_once("inc/ban.php");
//logged in
if(!empty($_SESSION['logged'])){
  $user=$_SESSION['logged'];
}
//login attempt
elseif(isset($_POST['login'])){
  //handle login here
}
//no attempt
else{
  //display home info + login form
  require_once("inc/pst.php");
}
require_once("inc/fot.php");
?>
