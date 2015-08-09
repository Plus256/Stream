<form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="post">
<?php
if(isset($_GET['err'])){
	$err=$_GET['err'];
	switch($err){
		case 1:
		$err_msg="All Fields Required";
		break;
		
		case 2:
		$err_msg="Passwords Should Match";
		break;
	}
	?>
    <div class="err"><?php echo $err_msg; ?></div>
    <?php
}
?>
<div>
<?php
require_once("adm_sup_att.php");
?>
</div>
<div>
<input type="text" placeholder="Frist Name" name="fname" />
</div>
<div>
<input type="text" placeholder="Last Name" name="lname" />
</div>
<div>
<input type="text" placeholder="Username" name="uname" />
</div>
<div>
<input type="password" placeholder="Password" name="pwd" />
</div>
<div>
<input type="password" placeholder="Confirm Password" name="cpwd" />
</div>
<div>
<input type="submit" value="Sign Up" name="adm_sup_att" />
</div>
</form>