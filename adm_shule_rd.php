<?php
$q=mysql_query("select *, s.id as sid from shule as s join pic as p join user as u on s.author=u.id and s.cover=p.id order by s.id desc");
while($r=mysql_fetch_assoc($q)){
	$id=$r['sid']; $title=$r['title']; $cover=$r['src']; $intro=$r['body']; $published=$r['created']; $category=$r['category'];
	switch($category){
		case 1: $category="Apps"; break;
		case 2: $category="Gadgets"; break;
		case 3: $category="Startups"; break;
		case 4: $category="Social"; break;
		case 5: $category="Multimedia"; break;
		case 6: $category="Code"; break;
		case 7: $category="Internet"; break;
	}
	echo "<a href=''>".$title."</a>".
			" - "."<a href='".$_SERVER['PHP_SELF']."?option=Shules&task=Edit&token=".$id."' class='adm_task_but'>Edit</a>".
			"<hr />";
}
?>