<?php
require_once("inc/hed.php");
require_once("inc/ban.php");
?>
<main id="main_content">
  <section id="follow">
      <div class="wrapper">
        <div id="follow_header">Hot stuff on Stream</div>
        <div id="follow_main">
          <!--trending feeds here-->
          <script>
          $(document).ready(function(){
            var id=document.URL;
            if(id.match('id')){
          		id=id.split("=");
          		id=id[(id.length)-1];
              pubStream(id);
          	}
            else{
              getFeed("uganda", "mashable.tech", "follow_main", 10);
            }
          });
          </script>
        </div>
        <div class="spacer"></div>
      </div>
  </section>
<?php
//not logged in
if(empty($_SESSION['logged'])){
  require_once("inc/start.php");
}
?>
</main>
<?php
require_once("inc/fot.php");
?>
