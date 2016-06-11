<?php
require_once('db.php');
?>
<section id="user_dash">
  <div class="wrapper">
    <aside id="user_dash_nav">
      <ul>
        <li><a href="./streams" onclick="fetchStream(); return false;">Streams</a></li>
        <li><a href="./hot">Hot</a></li>
        <li><a href="./profile" onclick="return false;">Profile</a></li>
        <li><a href="./account" onclick="return false;">Account</a></li>
        <li><a href="./settings" onclick="return false;">Settings</a></li>
      </ul>
      <div class="spacer"></div>
    </aside>
    <section id="user_dash_main">
      <?php
      $q=mysqli_query($conn, "select * from stream where user=$user_id");
      if($q){$r=mysqli_fetch_assoc($q);}
      ?>
      <div id="user_dash_main_cpanel">
        <?php
        if(mysqli_num_rows($q)>0){//button to create more streams
          ?>
          <a class="user_dash_main_cpanel_but" id="new_stream_button" onclick="addStream(); return false;"><?php echo file_get_contents("gra/ic_add.svg"); ?></a>
          <?php
        }
        else{//button to save first stream
          ?>
          <a class="user_dash_main_cpanel_but" id="save_stream_button" onclick="saveStream(); return false;"><?php echo file_get_contents("gra/ic_save.svg"); ?></a>
          <?php
        }
        ?>
        <div class="spacer"></div>
      </div>
      <div id="user_dash_main_feedback" class="user_dash_main_feedback">&nbsp;</div>
      <div id="user_dash_main_content">
        <?php
        if(mysqli_num_rows($q)>0){//display streams
          ?>
          <script>
          fetchStream();
          </script>
          <?php
        }
        else{//form to create new
          require_once("inc/new_stream.php");
        }
        ?>
        <div class="spacer"></div>
      </div>
      <div class="spacer"></div>
    </section>
    <div class="spacer"></div>
  </div>
</section>
