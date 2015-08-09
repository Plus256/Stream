<?php
$user_id=$_SESSION['adm_logged'];
$q=mysql_query("select * from user as u join pic as p on u.pic=p.id where u.id=$user_id");
$r=mysql_fetch_assoc($q);
$user_name=$r['fname']." ".$r['lname'];
if(isset($_GET['succ'])){
	$succ=$_GET['succ'];
	switch($succ){
		case 1:
		$succ_msg="Account Setup Successful";
		break;
	}
	?>
	<div class="succ">
		<div class="wrapper">
			<div><?php echo $succ_msg; ?></div>
			<div class="spacer"></div>
		</div>
	</div>
	<?php
}
require_once("adm_ban.php");
if(isset($_GET['option'])){
	require_once("adm_opt_ctrl.php");
}
else{
	require_once("adm_dsh.php");
}
?>