<?php
require_once("inc/hed.php");
require_once("inc/ban.php");
?>
<main id="main_content">
  <section id="follow">
      <div class="wrapper">
        <!--<div id="follow_header">Trending Hashtags</div>-->
        <div id="follow_main">
          <div class="grid_sizer"></div>
          <div class="spacer"></div>
          <!--trending feeds here-->
          <script>
          $(document).ready(function(){
            getTrending();
          });
          </script>
        </div>
        <div class="spacer"></div>
      </div>
  </section>
</main>
<?php
require_once("inc/fot.php");
?>
