<?php
ob_start();
session_start();
/*local credentials*/
$host="127.0.0.1";
$db="stream";
$user="root";
$pwd="root";
$port=3306;
//$conn=mysqli_connect($host, $user, $pwd, $db, $port) or die(mysqli_error());
/*end of local*/

/*remote credentials*
$host="127.0.0.1";
$db="plus256buwooya";
$user="plus256dbadmin";
$pwd="Psalm_23*";
$port=3306;
$conn=mysqli_connect($host, $user, $pwd, $db, $port) or die(mysqli_error());
/*end of remote*/
$short_name="Stream";
$full_name="Stream";
$slogan="Live Event Streaming";
$sponsor="Plus256";
$meta_keywords="Stream, Live Event Streaming, Social Wall";
$logo="gra/logo.png";
$noscript="Enable JavaScript in your browser to have the best experience at ".$short_name;
?>
