<form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
<?php
if(isset($_GET['err'])){
	$err=$_GET['err'];
	switch($err){
		case 1:
		$err_msg="Verify Credentials";
		break;
		
		case 2:
		$err_msg="Wrong Password";
		break;
	}
	?>
    <div class="err"><?php echo $err_msg; ?></div>
    <?php
}
if(isset($_GET['succ'])){
	$succ=$_GET['succ'];
	switch($succ){
		case 2:
		$succ_msg="Account Secure";
		break;
	}
	?>
    <div class="succ"><?php echo $succ_msg; ?></div>
    <?php
}
?>
<div>
<input type="text" placeholder="Username" name="uname" />
</div>
<div>
<input type="password" placeholder="Password" name="pwd" />
</div>
<div>
<input type="submit" value="Sign In" name="adm_sin_att" />
</div>
</form>