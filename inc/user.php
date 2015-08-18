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
      $q=mysqli_query($conn, "select *, s.id as s_id, s.status as s_status from user as u join stream as s on s.user=u.id where u.id='$user_id'");
      if($q){$r=mysqli_fetch_assoc($q);}
      ?>
      <div id="user_dash_main_cpanel">
        <script>
        $(document).ready(function(){
          document.getElementById("save_stream_button").addEventListener("click", saveStream, false);
        });
        </script>
        <?php
        if(mysqli_num_rows($r)>0){//button to create more streams
          ?>
          <a href="#" class="user_dash_main_cpanel_but" id="new_stream_button"><?php echo file_get_contents("gra/ic_add.svg"); ?></a>
          <?php
        }
        else{//button to save first stream
          ?>
          <a href="#" class="user_dash_main_cpanel_but" id="save_stream_button"><?php echo file_get_contents("gra/ic_save.svg"); ?></a>
          <?php
        }
        ?>
        <!--New(blue or theme color), Cancel(red), Save(green), Publish, Unpublish, Renew
        no stream: save
        new: save, cancel
        view: edit, new
        we're using icons for these
        <a href="#" class="user_dash_main_cpanel_but" id="save_stream_button"></a>
        <a href="#" class="user_dash_main_cpanel_but" id="new_stream_button">+</a>
        <a href="#" class="user_dash_main_cpanel_but" id="cancel_stream_button">/</a>
        <a href="#" class="user_dash_main_cpanel_but" id="edit_stream_button">~</a>
        -->
        <div class="spacer"></div>
      </div>
      <div id="user_dash_main_content">
        <?php
        if(mysqli_num_rows($r)>0){
          echo $r['u.id'];//display streams
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
