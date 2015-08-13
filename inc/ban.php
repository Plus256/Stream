<header id="banner">
    <div class="wrapper">
        <div id="logo_container"><a href="./"><?php echo file_get_contents("gra/logo.svg"); ?></a></div>
    	<div id="short_name">
        	<?php //echo $short_name; ?>
        </div>
        <nav id="menu">
        	<ul>
              <li><a href="./#start">START</a></li>
              <li><a href="./#contact" class="contact_button">CONTACT</a></li>
              <li><a href="./#about">ABOUT</a></li>
            </ul>
        </nav>
        <!--Begin Mobile Menu-->
        <nav id="mobile_menu">
            <div id="mobile_menu_icon"><div class="mobile_menu_icon_stripe"></div><div class="mobile_menu_icon_stripe"></div><div class="mobile_menu_icon_stripe"></div></div>
            <div id="mobile_menu_container">
                <ul>
                  <li><a href="./#start">START</a></li>
                  <li><a href="./#contact" class="contact_button">CONTACT</a></li>
                  <li><a href="./#about">ABOUT</a></li>
                </ul>
                <div class="spacer"></div>
            </div>
            <div class="spacer"></div>
        </nav>
        <!--End Mobile Menu-->
        <div class="spacer"></div>
    </div>
</header>
