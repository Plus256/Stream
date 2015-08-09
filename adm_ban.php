<div id="adm_banner">
	<div class="wrapper">
    	<div id="adm_banner_menu">
        	<a href="<?php echo $_SERVER['PHP_SELF']; ?>">Dashboard</a>
            <a href="<?php echo $_SERVER['PHP_SELF']; ?>?option=Shules">Shules</a>
            <a href="<?php echo $_SERVER['PHP_SELF']; ?>?option=Ads">Ads</a>
            <a href="<?php echo $_SERVER['PHP_SELF']; ?>?option=Events">Events</a>
            <a href="<?php echo $_SERVER['PHP_SELF']; ?>?option=Jobs">Jobs</a>
            <a href="<?php echo $_SERVER['PHP_SELF']; ?>?option=Users">Users</a>
        </div>
    	<div id="adm_banner_sin_det">
            <div id="adm_more_profile">
            	<a href="adm_sout.php">Sign Out</a>
            </div>
            <div id="adm_name"><?php echo $user_name ?></div>
        </div>
    	<div class="spacer"></div>
    </div>
</div>