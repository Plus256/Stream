<?php
$q=mysql_query("select * from shule as s join pic as p join user as u on s.author=u.id and s.cover=p.id where s.id=$token");
$r=mysql_fetch_assoc($q);
$title=$r['title']; $cover=$r['src']; $body=$r['body']; $status=$r['status']; $cat=$r['category']; $ctype=$r['ctype'];
?>
<form action="<?php echo $_SERVER['PHP_SELF']; ?>?option=Shules&task=Update&token=<?php echo $token; ?>" method="post" enctype="multipart/form-data">
<div>
<input type="text" placeholder="Shule Title" name="shule_title" value="<?php echo $title; ?>" />
</div>
<div>
<div><img class="ed_img" src="img/<?php echo $cover; ?>" /></div>
<input type="file" name="shule_cover" />
</div>
<div>
<select name="shule_cat">
    <?php
    require_once("cnf.php");
    $q=mysql_query("select * from cat order by id asc");
    while($r=mysql_fetch_assoc($q)){
        if($cat==$r['id']){
            echo "<option value='".$r['id']."' selected>".$r['name']."</option>";
        }
        else{
            echo "<option value='".$r['id']."'>".$r['name']."</option>";
        }
    }
    ?>
</select>
<select name="shule_ctype">
    <?php
    require_once("cnf.php");
    $q=mysql_query("select * from ctype order by id asc");
    while($r=mysql_fetch_assoc($q)){
        if($ctype==$r['id']){
            echo "<option value='".$r['id']."' selected>".$r['name']."</option>";
        }
        else{
            echo "<option value='".$r['id']."'>".$r['name']."</option>";
        }
    }
    ?>
</select>
<?php
if($status==0){
    ?>
    <input type="radio" name="shule_status" value="0" checked />Draft <input type="radio" name="shule_status" value="1" />Published
    <?php
}
else{
    ?>
    <input type="radio" name="shule_status" value="0" />Draft <input type="radio" name="shule_status" value="1" checked />Published
    <?php
}
?>
</div>
<div>
<textarea placeholder="Content Goes Here" name="shule_body"><?php echo $body; ?></textarea>
</div>
<div>
<input type="submit" value="Update Shule" name="shule_save_att" />
</div>
</form>