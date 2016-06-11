<?php
require __DIR__ . '/vendor/autoload.php';
//This script is executed at the shell.
//we fork at this point
$pid=pcntl_fork();
print($pid."\n");//for my debugging purposes
if(!$pid){//either fork fails or process is child
  //Passed Arguments
  $keywords="".$argv[1]."";//receiving command line parameters
  $author=$argv[2];//receiving command line parameters
  $stream=$argv[3];//receiving command line parameters
  /**
   * Example of using Phirehose to display a live filtered stream using track words
   */
  class FilterTrackConsumer extends OauthPhirehose
  {
    /**
     * Enqueue each status
     *
     * @param string $status
     */
    public function enqueueStatus($status)
    {
      /*
       * In this simple example, we will just display to STDOUT rather than enqueue.
       * NOTE: You should NOT be processing tweets at this point in a real application, instead they should be being
       *       enqueued and processed asyncronously from the collection process.
       */
      require('inc/db.php');
      //connection should be called each time! Putting this line at the beginning causes an error!
      //use require - require_once, well, only calls the script once and an error on subsequent times.
      $status=mysqli_real_escape_string($conn, $status);
      $author=$GLOBALS['author'];//variables have to be referenced as globals! I GUESS IT'S BCOZ THEY'RE BEING CALLED WITHIN A CLASS DEFINITION
      $stream=$GLOBALS['stream'];//their "friend" $keywords called out of here doesn't require that modification!!!
      $q=mysqli_query($conn, "insert into status (json, author, stream, src) values ('$status', $author, $stream, 0)");
      if(!$q){
        print mysqli_error($conn);
      }
      else{
        //capture PID
      }
    }
  }
  
  // The OAuth credentials you received when registering your app at Twitter
  define("TWITTER_CONSUMER_KEY", "OIgwuhdIJXaNYDN1HMzxYNaBf");
  define("TWITTER_CONSUMER_SECRET", "b5dALYXjYl5f1cR3SSgn03TS7QyrJ9FHrUOxz1arsHJcQfWXLD");
  
  
  // The OAuth data for the twitter account
  //DYNAMIC - different for every logged in user - ACTUALLY FOR EVERY STREAM
  //Every stream makes its own authorized requests, so as to minimize exceeding rate limits.
  define("OAUTH_TOKEN", "1933453284-skKBHJyENucjRoPJ5QaAuqklYWJFZIt9mVuzYqk");
  define("OAUTH_SECRET", "QLsuRnhMi3dzl9i1PnkXAS3zwq6T7GxLOvBO3mJ1AqCHY");
  
  // Start streaming
  $sc = new FilterTrackConsumer(OAUTH_TOKEN, OAUTH_SECRET, Phirehose::METHOD_FILTER);
  $sc->setTrack(array($keywords));
  $sc->consume();
}
?>
