<?php
$q=mysql_query("select * from shule as s join pic as p join user as u on s.author=u.id and s.cover=p.id where s.id=$token");
$r=mysql_fetch_assoc($q);
$title=$r['title']; $cover=$r['src']; $body=$r['body']; $status=$r['status']; $cat=$r['category']; $ctype=$r['ctype'];
?>
<form id="shule_cr_fm" action="<?php echo $_SERVER['PHP_SELF']; ?>?option=Shules&task=Update&token=<?php echo $token; ?>" method="post" enctype="multipart/form-data">
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
<div id="wysiwyg_cp">
  <input type="button" onClick="formatDoc('bold');" value="B"> 
  <input type="button" onClick="formatDoc('underline');" value="U">
  <input type="button" onClick="formatDoc('italic');" value="I">
  <input type="button" onClick="iFontSize()" value="Text Size">
  <input type="button" onClick="iForeColor()" value="Text Color">
  <input type="button" onClick="iHorizontalRule()" value="HR">
  <input type="button" onClick="iUnorderedList()" value="UL">
  <input type="button" onClick="iOrderedList()" value="OL">
  <input type="button" onClick="iLink()" value="Link">
  <input type="button" onClick="iUnLink()" value="UnLink">
  <input type="button" onClick="iImage()" value="Image">
  <div class="spacer"></div>
</div>
<div>
<input type="hidden" name="shule_body">
<div id="richtext_field" contentEditable="true"><?php echo $body; ?></div>
</div>
<div>
<input type="button" value="Save Shule" onClick="saveShule();" />
</div>
</form>