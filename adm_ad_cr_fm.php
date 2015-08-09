<form action="<?php echo $_SERVER['PHP_SELF']; ?>?option=Ads&task=Save" method="post" enctype="multipart/form-data">
<div>
<input type="text" placeholder="Ad Title" name="shule_title" />
</div>
<div>
<input type="file" name="shule_cover" />
</div>
<div>
<select name="shule_cat">
    <?php
    require_once("cnf.php");
    $q=mysql_query("select * from cat order by id asc");
    while($r=mysql_fetch_assoc($q)){
        echo "<option value='".$r['id']."'>".$r['name']."</option>";
    }
    ?>
</select>
<select name="shule_ctype">
    <?php
    require_once("cnf.php");
    $q=mysql_query("select * from ctype order by id asc");
    while($r=mysql_fetch_assoc($q)){
        echo "<option value='".$r['id']."'>".$r['name']."</option>";
    }
    ?>
</select>
<input type="radio" name="shule_status" value="0" />Draft <input type="radio" name="shule_status" value="1" checked />Published
</div>
<div>
<textarea placeholder="Content Goes Here" name="shule_body"></textarea>
</div>
<div>
<input type="submit" value="Save Shule" name="shule_save_att" />
</div>
</form>