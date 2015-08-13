<?php
require_once("inc/cnf.php");
?>
<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width">
<meta name="viewport" content="initial-scale=1.0">
<meta name="description" content="<?php echo $full_name; ?>">
<meta name="keywords" content="<?php echo $meta_keywords; ?>">
<link rel="shortcut icon" href="gra/favicon.ico" type="image/x-icon">
<link rel="stylesheet" type="text/css" href="css/glb.css" />
<link rel="stylesheet" type="text/css" href="css/mob.css" />
<title><?php echo $slogan; ?></title>
<!--Plus256 Network, Ltd ~ www.plus256.com-->
<!--<script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.3/jquery.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/masonry/3.3.1/masonry.pkgd.min.js"></script>-->
<script type="text/javascript" src="js/jquery-1.11.3.min.js"></script>
<script type="text/javascript" src="js/masonry.pkgd.min.js"></script>
<script type="text/javascript" src="js/imagesloaded.pkgd.min.js"></script>
<script type="text/javascript" src="js/init.js"></script>
<script type="text/javascript" src="js/fun.js"></script>
<script src="//use.typekit.net/nww6oyv.js"></script>
<script>try{Typekit.load();}catch(e){}</script>
</head>
<body onkeydown="getKey(event);">
<noscript id="noscript"><?php echo $noscript; ?></noscript>
<script>
$(document).ready(function(){
	$(".contact_button").click(contact);
});
</script>
<div id="dialog_box_overlay"></div>
<div id="dialog_box">
	<div id="dialog_box_head"></div>
	<div id="dialog_box_body"></div>
	<div id="dialog_box_foot"></div>
</div>
