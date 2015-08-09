<?php
//$q=mysqli_query($conn, "select * from cat order by id asc");
?>
<div id="menu">
    <div id="menu_icon"><div class="menu_icon_stripe"></div><div class="menu_icon_stripe"></div><div class="menu_icon_stripe"></div></div>
    <div id="menu_container">
        <ul>
        <?php
        /*&if($q){
            while($r=mysqli_fetch_assoc($q)){
                echo "<li><a href='./?cat=".$r['name']."'>".$r['name']."</a></li>";
            }
        }*/
        ?>
        </ul>
        <div class="spacer"></div>
    </div>
    <div class="spacer"></div>
</div>
<?php
?>