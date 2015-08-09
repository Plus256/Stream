<div class="adm_opt_ctrl">
	<div class="wrapper">
    	<?php
		if(isset($_GET['task'])){
			$task=$_GET['task'];
            switch($task){
                case "Create":
                ?>
                <div class="adm_opt_ctrl_task_p">
                    <a href="<?php echo $_SERVER['PHP_SELF']; ?>?option=Shules&task=Cancel">Cancel Creation</a>
                </div>
                <div class="adm_opt_ctrl_cont_p">
                    <?php require_once("adm_shule_cr_fm.php"); ?>
                </div>
                <?php
                break;
				
                case "Save":
                require_once("adm_shule_save.php");
                break;
				
                case "Edit":
                ?>
                <div class="adm_opt_ctrl_task_p">
                    <a href="<?php echo $_SERVER['PHP_SELF']; ?>?option=Shules&task=Cancel">Cancel Edit</a>
                </div>
                <div class="adm_opt_ctrl_cont_p">
                    <?php
                    if(isset($_GET['token'])){
                        $token=$_GET['token'];
                        require_once("adm_shule_ed.php");
                    }
                    ?>
                </div>
                <?php
                break;
				
                case "Update":
                if(isset($_GET['token'])){
                    $token=$_GET['token'];
                    require_once("adm_shule_ed_save.php");
                }
                break;
				
                case "Cancel":
                header('Location:'.$_SERVER['PHP_SELF'].'?option=Shules');
                break;
            }
		}
		else{
			?>
            <div class="adm_opt_ctrl_task_p">
                <a href="<?php echo $_SERVER['PHP_SELF']; ?>?option=Shules&task=Create">Create Shule</a>
            </div>
            <div class="adm_opt_ctrl_cont_p">
                <?php require_once("adm_shule_rd.php"); ?>
            </div>
			<?php
		}
		?>
    	<div class="spacer"></div>
    </div>
</div>