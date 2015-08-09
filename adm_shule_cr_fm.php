<form action="<?php echo $_SERVER['PHP_SELF']; ?>?option=Shules&task=Save" method="post" enctype="multipart/form-data" id="shule_cr_fm">
<div>
<input type="text" placeholder="Shule Title" name="shule_title" />
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
<div id="richtext_field" contentEditable="true"></div>
</div>
<div>
<input type="button" value="Save Shule" onClick="saveShule();" />
</div>
</form>