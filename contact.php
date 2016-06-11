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
<section class="nav_section" id="contact_section">
  <div class="wrapper">
    <div id="contact_header">&nbsp;</div>
    <div id="contact_main">
      <div style="margin:10px 0;"><input type="text" placeholder="Your Email Address" id="msg_frm" /></div>
      <div style="margin:10px 0;"><input type="text" placeholder="Subject" id="msg_sbj" /></div>
      <div id="msg_body" contenteditable="true"></div>
      <div id="message_send_button"><?php echo file_get_contents("gra/ic_send.svg"); ?></div>
    </div>
    <div id="contact_footer">&nbsp;</div>
    <div class="spacer"></div>
</div>
</section>
<?php
require_once("inc/fot.php");
}
?>
