<header id="banner">
    <div class="wrapper">
        <div id="logo_container"><a href="./"><?php echo file_get_contents("gra/logo.svg"); ?></a></div>
        <?php
        //logged in
        if(!empty($_SESSION['logged'])){
          $user_id=$_SESSION['logged'];
          $q=mysqli_query($conn, "select *, d.id as d_id, d.src as d_src from user as u join dp as d on u.dp=d.id where u.id='$user_id'");
          $r=mysqli_fetch_assoc($q);
          ?>
          <div id="user_flyout">
            <div id="user_flyout_dp"><img src="<?php echo 'img/'.$r['d_src']; ?>" /></div>
            <div id="user_flyout_menu">
                <ul>
                  <li><a href="#">Profile</a></li>
                  <li><a href="#">Settings</a></li>
                  <li><a href="logout.php">Sign Out</a></li>
                </ul>
                <div class="spacer"></div>
            </div>
            <div id="user_flyout_name">
            <?php
            if($r['uname']!=''){//username set
              echo $r['uname'];
            }
            else{//use cut-down email
              $cut_email=explode("@", $r['email']);
              echo $cut_email[0];
            }
            ?>
            </div>
            <div class="spacer"></div>
          </div>
          <?php
        }
        else{//default
          ?>
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
          <?php
        }
        ?>
        <div class="spacer"></div>
    </div>
</header>
