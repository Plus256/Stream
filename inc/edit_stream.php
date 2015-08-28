<?php
/*require_once("cnf.php");
if(isset($_GET['edit_stream']) && isset($_GET['id'])){
  $stream_id=$_GET['id'];
  $user_id=$_SESSION['logged'];
  $data=array();
  $sources=array();
	$q=mysqli_query($conn, "select * from stream where id=$stream_id");
  if($q){
    $r=mysqli_fetch_assoc($q);
    $id=$r['id']; $name=$r['name']; $status=$r['status']; $created=$r['created'];
    $created=elapsedTime($created);
    switch($status){
      case 0: $status="Draft"; break;
      case 1: $status="Live"; break;
    }
    $qs=mysqli_query($conn, "select src.id, src.type, src.url from source as src join sourcetostream as sts join stream as s on sts.stream=s.id and sts.source=src.id where s.id=$stream_id");
    if($qs){
      while($rs=mysqli_fetch_assoc($qs)){
        $src_id=$rs['id'];$src_type=$rs['type'];$src_url=$rs['url'];
        switch($src_type){
          case 0: $src_type="Facebook"; break;
          case 1: $src_type="Twitter"; break;
        }
        $src_rec=array("id"=>$src_id, "type"=>$src_type, "url"=>$src_url);
        array_push($sources, $src_rec);
      }
    }
    $rec=array("id"=>$id, "name"=>$name, "status"=>$status, "created"=>$created, "sources"=>$sources);
    array_push($data, $rec);
  	echo json_encode($data);
  }
}*/
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
      <input type="text" placeholder="Stream Name" id="new_stream_name" />
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
      <input type="text" placeholder="facebook.com/handle" id="new_stream_fb" />
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
      <input type="text" placeholder="#hashtag" id="new_stream_twt" />
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
