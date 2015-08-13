<?php
require_once("inc/hed.php");
require_once("inc/ban.php");
?>
<main id="main_content">
<?php
//logged in
if(!empty($_SESSION['logged'])){
  $user=$_SESSION['logged'];
  require_once("inc/pst.php");
}
//login attempt
elseif(isset($_POST['login'])){
  //handle login here
}
//no attempt
else{
  //display home info + login form
  require_once("inc/hero.php");
  require_once("inc/trend.php");
}
?>
</main>
<?php
require_once("inc/fot.php");
?>
