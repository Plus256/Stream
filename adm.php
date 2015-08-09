<?php
require_once("hed.php");
require_once("ban.php");
if(!empty($_SESSION['adm_logged'])){
	require_once("adm_cp.php");
}
elseif(isset($_POST['adm_sin_att'])){
	require_once("adm_sin_att.php");
}
else{
	?>
    <div id="admin_sup_sin_interface">
        <div class="wrapper">
        <div id="admin_sup_sin_interface_info">
        	<div id="admin_sup_sin_interface_info_wrapper">
            </div>
        </div>
        <div id="admin_sup_sin_interface_sup_sin">
    <?php
	$q=mysql_query("select * from user");
	if(mysql_num_rows($q)<1){
		require_once("adm_sup.php");
	}
	else{
		require_once("adm_sin.php");
	}
	?>
    		</div>
            <div class="spacer"></div>
        </div>
    </div>
    <?php
}
require_once("fot.php");
?>