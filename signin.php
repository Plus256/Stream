<?php
require_once("inc/cnf.php");
//logged in
if(!empty($_SESSION['logged'])){
  $user_id=$_SESSION['logged'];
  header('Location: ./');
}
else{
require_once("inc/hed.php");
require_once("inc/ban.php");
?>
<script>
function getKey(e){
  var key=e.keyCode;
  if(key==13){
  	signIn();
  }
}
</script>
<section class="nav_section">
  <div class="wrapper">
    <!--<div id="signin_header"> Login and Stream</div>-->
    <div id="signin_main">
      <input type="text" placeholder="Email or Username" id="signin_email" onkeydown="getKey(event);" />
      <input type="password" placeholder="Password" id="signin_password" onkeydown="getKey(event);" />
      <input type="button" value="Sign In" id="signin_button" />
    </div>
    <div id="signin_footer">&nbsp;</div>
    <div class="spacer"></div>
</div>
</section>
<?php
require_once("inc/fot.php");
}
?>
