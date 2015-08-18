<?php
require_once("inc/hed.php");
require_once("inc/ban.php");
?>
<main id="main_content">
<?php
//logged in
if(!empty($_SESSION['logged'])){
  $user_id=$_SESSION['logged'];
  require_once("inc/user.php");
}
//default
else{
  //display home info + login form
  require_once("inc/hero.php");
  require_once("inc/start.php");
  require_once("inc/trend.php");
}
?>
</main>
<?php
require_once("inc/fot.php");
?>
