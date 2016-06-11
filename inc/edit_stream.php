<?php
require_once("fun.php");
if(isset($_GET['edit_stream']) && isset($_GET['id'])){
  $stream_id=$_GET['id'];
  $user_id=$_SESSION['logged'];
	$q=mysqli_query($conn, "select * from stream where id=$stream_id");
  if($q){
    $r=mysqli_fetch_assoc($q);
    $id=$r['id']; $keywords=$r['src']; $status=$r['status']; $created=$r['created'];
    //$created=elapsedTime($created);
    switch($status){
      case 0: $status="Draft"; break;
      case 1: $status="Live"; break;
    }
  }
  ?>

  <div class="stream_form">

    <!--<div class="new_stream_category">
      <div class="new_stream_category_header">
        <div class="new_stream_category_header_header">
          Stream Title <!--Unique means exists and is Live. If exists but dead then it can be used by someone else--
        </div>
        <div class="new_stream_category_header_main">
          <div style="padding:10px 0;">A unique name your audience shall use to follow your stream. Keep it short and memorable.</div>
        </div>
        <div class="spacer"></div>
      </div>
      <div class="new_stream_category_main">
        <input type="text" placeholder="Brian Weds Morean" id="new_stream_name" />
      </div>
      <div class="spacer"></div>
    </div>-->
  
    <div class="new_stream_category">
      <div class="new_stream_category_header">
        <div class="new_stream_category_header_header">
          Which Topic would you like to Follow?
        </div>
        <div class="new_stream_category_header_main">
          <div style="padding:10px 0;">Separate multiple words with a comma.</div>
        </div>
        <div class="spacer"></div>
      </div>
      <div class="new_stream_category_main">
        <input type="text" placeholder="Keyword, #Hashtag" id="keywords" value="<?php echo $keywords; ?>" />
      </div>
      <div class="spacer"></div>
    </div>
  
    <div class="new_stream_category">
      <div class="new_stream_category_header">
        <div class="new_stream_category_header_header">
          Social Platforms
        </div>
        <div class="new_stream_category_header_main">
          <!--<div style="padding:10px 0;">Click to turn ON or OFF platforms where Stream should fetch data.</div>-->
        </div>
        <div class="spacer"></div>
      </div>
      <div class="new_stream_category_main">
        <img src="gra/twitter.png" style="width:5em; height:auto;" />
      </div>
      <div class="spacer"></div>
    </div>
  
    <div class="new_stream_category">
      <div class="new_stream_category_header">
        <div class="new_stream_category_header_header">
          More Social Networks Coming Soon
        </div>
        <div class="new_stream_category_header_main">
          <div style="padding:10px 0;">We're working closely with these guys to get you the best, ASAP.</div>
          <img src="gra/instagram.png" style="width:5em; height:auto;" />
          <img src="gra/facebook.png" style="width:5em; height:auto;" />
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
  if(!empty($_POST['keywords'])){//at least one source
    $keywords=cleanInput($_POST['keywords']);
    $q=mysqli_query($conn, "update stream set src='$keywords' where id=$stream_id");
    if($q){
      echo "1";
    }
	}
	else{
		echo "0";
	}
}

if(isset($_GET['up_state']) && isset($_GET['id'])){
  //NOTE: only change state when process successfully starts
  //meaning do a MySQL update when forking is successful
  $stream_id=$_GET['id'];
  $state=$_POST['state'];
  $q=mysqli_query($conn, "update stream set status=$state where id=$stream_id");
  if($q){
    switch($state){
      case 0:
      echo "0";
      //Killing Collection Process using PID
      break;
      case 1:
      echo "1";
      //Initializing Collection from CLI
      $q=mysqli_query($conn, "select src from stream where id=$stream_id");
      if($q){
        $r=mysqli_fetch_assoc($q);
        $keywords=$r['src'];
        $user_id=$_SESSION['logged'];
        $user="".$user_id."";//stringify vars
        $keywords="".$keywords."";
        $stream="".$stream_id."";
        //cleaning input
      	$user=escapeshellarg($user);
      	$keywords=escapeshellarg($keywords);
      	$stream=escapeshellarg($stream);
        exec("/usr/bin/php /var/www/html/twt_stream.php $keywords $user $stream >> /var/www/html/exec_out.log 2>&1 &");
      }
      break;
    }
  }
}

?>
