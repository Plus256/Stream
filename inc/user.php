<section id="user_dash">
  <div class="wrapper">
    <aside id="user_dash_nav">
      <ul>
        <li><a href="#">Streams</a></li>
        <li><a href="#">Account</a></li>
        <li><a href="#">Profile</a></li>
        <li><a href="#">Notes</a></li>
        <li><a href="#">Settings</a></li>
      </ul>
      <div class="spacer"></div>
    </aside>
    <section id="user_dash_main">
      <?php
      $q=mysqli_query($conn, "select *, s.id as s_id, s.status as s_status, s.name as s_name from stream as s join user as u on s.user=u.id where u.id='$user_id'");
      if($q){$r=mysqli_fetch_assoc($q);}
      ?>
      <div id="user_dash_main_cpanel">
        <?php
        if(mysqli_num_rows($q)>0){//button to create more streams
          ?>
          <!--Create: save, cancel. Read: edit, new. Update: Save, Cancel-->
          <a href="#" class="user_dash_main_cpanel_but" id="new_stream_button" onclick="addStream(); return false;"><?php echo file_get_contents("gra/ic_add.svg"); ?></a>
          <!--<a href="#" class="user_dash_main_cpanel_but" id="save_stream_button" onclick="saveStream(); return false;"><?php //echo file_get_contents("gra/ic_save.svg"); ?></a>
          <a href="#" class="user_dash_main_cpanel_but" id="edit_stream_button"><?php //echo file_get_contents("gra/ic_edit.svg"); ?></a>
          <a href="#" class="user_dash_main_cpanel_but" id="cancel_stream_button"><?php //echo file_get_contents("gra/ic_cancel.svg"); ?></a>-->
          <?php
        }
        else{//button to save first stream
          ?>
          <a href="#" class="user_dash_main_cpanel_but" id="save_stream_button" onclick="saveStream(); return false;"><?php echo file_get_contents("gra/ic_save.svg"); ?></a>
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
