<div id="main_content">
    <div class="wrapper">
        <div id="feed_container">
              <script>
              $('#feed_container').imagesLoaded(function(){
                $('#feed_container').masonry({
                  itemSelector:'.feed',
                  columnWidth:'.feed',
                  isAnimated: true
                });
              });
              </script>
              <div class="spacer"></div>
          </div>
          <?php require_once("inc/ads.php"); ?>
        <div class="spacer"></div>
    </div>
</div>
