<?php
ob_start();
session_start();
/*local credentials*/
$host="127.0.0.1";
$db="stream";
$user="root";
$pwd="root";
$port=3306;
$conn=mysqli_connect($host, $user, $pwd, $db, $port) or die(mysqli_connect_error());
/*end of local*/

/*remote credentials*
$host="mysql2000.my-virtual-panel.com";
$db="presence_str_plus";
$user="presence_dbadmin";
$pwd="43ahuRzcN0C#";
$port=3306;
$conn=mysqli_connect($host, $user, $pwd, $db, $port) or die(mysqli_connect_error());
/*end of remote*/
$short_name="Stream";
$full_name="Stream";
$slogan="Live Social Feeds";
$sponsor="Plus256";
$meta_keywords="Stream, Live Social Feeds, Social Wall";
$logo="gra/logo_dark.png";
$noscript="Enable JavaScript in your browser to have the best experience at ".$short_name;
?>
