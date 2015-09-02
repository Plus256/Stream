<?php
require_once("fun.php");
if(isset($_GET['edit_stream']) && isset($_GET['id'])){
  $stream_id=$_GET['id'];
  $user_id=$_SESSION['logged'];
	$q=mysqli_query($conn, "select * from stream where id=$stream_id");
  if($q){
    $r=mysqli_fetch_assoc($q);
    $id=$r['id']; $name=$r['name']; $status=$r['status']; $created=$r['created'];
    //$created=elapsedTime($created);
    switch($status){
      case 0: $status="Draft"; break;
      case 1: $status="Live"; break;
    }
    $qs=mysqli_query($conn, "select src.id, src.type, src.url from source as src join sourcetostream as sts join stream as s on sts.stream=s.id and sts.source=src.id where s.id=$stream_id");
    if($qs){
      while($rs=mysqli_fetch_assoc($qs)){
        $src_id=$rs['id'];$src_type=$rs['type'];$src_url=$rs['url'];
        switch($src_type){
          case 0: $fb_src=$src_url; break;
          case 1: $twt_src=$src_url; break;
        }
      }
    }
  }
  ?>

  <div class="stream_form">

    <div class="new_stream_category">
      <div class="new_stream_category_header">
        <div class="new_stream_category_header_header">
          Stream Name
        </div>
        <div class="new_stream_category_header_main">
          Your audience shall use this name to follow your stream. Make sure it's unique, short and memorable.
        </div>
        <div class="spacer"></div>
      </div>
      <div class="new_stream_category_main">
        <input type="text" placeholder="Stream Name" id="new_stream_name" value="<?php echo $name; ?>" />
      </div>
      <div class="spacer"></div>
    </div>

    <div class="new_stream_category">
      <div class="new_stream_category_header">
        <div class="new_stream_category_header_header">
          Facebook Handle
        </div>
        <div class="new_stream_category_header_main">
          <img src="gra/facebook.png" style="width:5em; height:auto;" />
          <div style="padding:10px 0;">Facebook doesn't support hashtags, apparently. Your handle can be your page name, or facebook username.</div>
        </div>
        <div class="spacer"></div>
      </div>
      <div class="new_stream_category_main">
        <input type="text" placeholder="facebook.com/handle" id="new_stream_fb" value="<?php echo $fb_src; ?>" />
      </div>
      <div class="spacer"></div>
    </div>

    <div class="new_stream_category">
      <div class="new_stream_category_header">
        <div class="new_stream_category_header_header">
          Twitter Hashtag
        </div>
        <div class="new_stream_category_header_main">
          <img src="gra/twitter.png" style="width:5em; height:auto;" />
          <div style="padding:10px 0;">This hashtag can be used by anyone on Twitter to post.</div>
        </div>
        <div class="spacer"></div>
      </div>
      <div class="new_stream_category_main">
        <input type="text" placeholder="#hashtag" id="new_stream_twt" value="<?php echo $twt_src; ?>" />
      </div>
      <div class="spacer"></div>
    </div>

    <div class="new_stream_category">
      <div class="new_stream_category_header">
        <div class="new_stream_category_header_header">
          More Social Networks Coming Soon
        </div>
        <div class="new_stream_category_header_main">
          <div>We're working closely with these guys to get you the best, ASAP.</div>
          <img src="gra/instagram.png" style="width:5em; height:auto;" />
        </div>
        <div class="spacer"></div>
      </div>
      <div class="new_stream_category_main">
        <!--<input type="text" placeholder="Stream Name" id="new_stream_name" />-->
      </div>
      <div class="spacer"></div>
    </div>

    <div class="spacer"></div>
  </div>

  <?php
}

if(isset($_GET['update_stream']) && isset($_GET['id'])){
  $stream_id=$_GET['id'];
  if(!empty($_POST['fb']) || !empty($_POST['twt'])){//at least one source
    if(!empty($_POST['name'])){
      $name=cleanInput($_POST['name']);
    }
    else{//get last id from table
      $q=mysqli_query($conn, "select id from stream order by id desc limit 1");
      if(mysqli_num_rows($q)>0){
        $r=mysqli_fetch_assoc($q);
        $next_stream_id=$r['id']+1;
        $name="stream".$next_stream_id;
      }
      else{//no stream in db
        $name="stream1";
      }
    }
    //$user_id=$_SESSION['logged'];
    $q=mysqli_query($conn, "update stream set name='$name' where id=$stream_id");
    if($q){
      //clear db entries first
      $q=mysqli_query($conn, "delete from sourcetostream where stream=$stream_id");
      if(!empty($_POST['fb']) && !empty($_POST['twt'])){//if both sources are provided
        $fb=cleanInput($_POST['fb']);
        $twt=cleanInput($_POST['twt']);

        $q=mysqli_query($conn, "insert into source (type, url) values (0, '$fb')");//insert fb first
        if($q){
          $fb_src=mysqli_insert_id($conn);//mysql_query("select last_insert_id() into @source");
          $q=mysqli_query($conn, "insert into sourcetostream (source, stream) values ($fb_src, $stream_id)");
          if($q){//then twitter
            $q=mysqli_query($conn, "insert into source (type, url) values (1, '$twt')");
            if($q){
              $twt_src=mysqli_insert_id($conn);//mysql_query("select last_insert_id() into @source");
              $q=mysqli_query($conn, "insert into sourcetostream (source, stream) values ($twt_src, $stream_id)");
              if($q){
                echo "1";
              }
              else{
                echo mysqli_error($conn);
              }
            }
            else{
              echo "0";
            }
          }
          else{
            echo mysqli_error($conn);
          }
        }
        else{
          echo "0";
        }
      }
      elseif(!empty($_POST['twt']) && empty($_POST['fb'])){//if twitter alone is provided
        $twt=cleanInput($_POST['twt']);
        $q=mysqli_query($conn, "insert into source (type, url) values (1, '$twt')");
        if($q){
          $twt_src=mysqli_insert_id($conn);//mysql_query("select last_insert_id() into @source");
          $q=mysqli_query($conn, "insert into sourcetostream (source, stream) values ($twt_src, $stream_id)");
          if($q){
            echo "1";
          }
          else{
            echo mysqli_error($conn);
          }
        }
        else{
          echo "0";
        }
      }
      else{//if facebook alone is provided
        $fb=cleanInput($_POST['fb']);
        $q=mysqli_query($conn, "insert into source (type, url) values (0, '$fb')");
        if($q){
          $fb_src=mysqli_insert_id($conn);//mysql_query("select last_insert_id() into @source"); BETTER THAN THIS <-
          $q=mysqli_query($conn, "insert into sourcetostream (source, stream) values ($fb_src, $stream_id)");
          if($q){
            echo "1";
          }
          else{
            echo mysqli_error($conn);
          }
        }
        else{
          echo "0";
        }
      }
    }
	}
	else{
		echo "2";
	}
}

if(isset($_GET['up_state']) && isset($_GET['id'])){
  $stream_id=$_GET['id'];
  $state=$_POST['state'];
  $q=mysqli_query($conn, "update stream set status=$state where id=$stream_id");
  if($q){
    switch($state){
      case 0:
      echo "0";
      break;
      case 1:
      echo "1";
      break;
    }
  }
}

?>
