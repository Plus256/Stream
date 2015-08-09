<?php
require_once("cnf.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width">
<meta name="viewport" content="initial-scale=1.0">
<meta name="description" content="<?php echo $short_name; ?> - <?php echo $tagline; ?>">
<meta name="keywords" content="Real-time, Event, Live, Stream, Social">
<meta property="og:url" content="http://<?php echo $_SERVER['HTTP_HOST'].$_SERVER['REQUEST_URI']; ?>" /> 
<meta property="og:title" content="<?php echo $og_title; ?>" />
<meta property="og:description" content="<?php echo $og_descr; ?>" /> 
<meta property="og:image" content="<?php echo $og_cover; ?>" /> 
<link rel="shortcut icon" type="image/x-icon" href="gra/fav.ico" />
<link rel="stylesheet" type="text/css" href="css/glb.css" />
<link rel="stylesheet" type="text/css" href="css/mob.css" />
<link rel="stylesheet" type="text/css" href="css/adm_glb.css" />
<link rel="stylesheet" type="text/css" href="css/adm_mob.css" />
<!--[if IE]>
<link rel="stylesheet" type="text/css" href="css/ie.css" />
<![endif]-->
<!--[if !IE]><!-->
<link rel="stylesheet" type="text/css" href="css/nie.css" />
<!--<![endif]-->
<title><?php echo $short_name; ?> - <?php echo $tagline; ?></title>
<script type="text/javascript" src="js/init.js"></script>
<script type="text/javascript" src="js/fun.js"></script>
<script type="text/javascript" src="js/wysiwyg.js"></script>
</head>
<body onkeydown="getKey(event);">
<div id="dialog_box_overlay"></div>
<div id="dialog_box">
  <div id="dialog_box_head"></div>
  <div id="dialog_box_body"></div>
  <div id="dialog_box_foot"></div>
</div>
<!--Facebook JS SDK-->
<script>
  window.fbAsyncInit = function() {
    FB.init({
      appId      : '482219788583361',
      xfbml      : true,
      version    : 'v2.2'
    });
  };

  (function(d, s, id){
     var js, fjs = d.getElementsByTagName(s)[0];
     if (d.getElementById(id)) {return;}
     js = d.createElement(s); js.id = id;
     js.src = "//connect.facebook.net/en_US/sdk.js";
     fjs.parentNode.insertBefore(js, fjs);
   }(document, 'script', 'facebook-jssdk'));
</script>
<!--Google Analytics-->
<script>
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
  (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
  m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics.js','ga');

  ga('create', 'UA-58431178-1', 'auto');
  ga('send', 'pageview');
</script>
<!--Twitter Sharing-->
<script>
window.twttr=(function(d,s,id){var js,fjs=d.getElementsByTagName(s)[0],t=window.twttr||{};if(d.getElementById(id))return;js=d.createElement(s);js.id=id;js.src="https://platform.twitter.com/widgets.js";fjs.parentNode.insertBefore(js,fjs);t._e=[];t.ready=function(f){t._e.push(f);};return t;}(document,"script","twitter-wjs"));
</script>