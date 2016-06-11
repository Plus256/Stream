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
  	signUp();
  }
}
</script>
<section class="nav_section">
  <div class="wrapper">
    <!--<div id="signup_header"> Create a Free Channel</div>-->
    <div id="signup_main">
      <input type="text" placeholder="Email Address" id="signup_email" onkeydown="getKey(event);" />
      <input type="password" placeholder="Password" id="signup_password" onkeydown="getKey(event);" />
      <input type="button" value="Sign Up" id="signup_button" />
    </div>
    <div id="signup_footer">&nbsp;</div>
    <div class="spacer"></div>
</div>
</section>
<?php
require_once("inc/fot.php");
}
?>
