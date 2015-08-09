<?php
$q=mysql_query("select *, a.id as aid from ad as a join pic as p on a.pic=p.id where a.status=1 order by a.id desc");
while($r=mysql_fetch_assoc($q)){
	$id=$r['aid']; $title=$r['title']; $pic=$r['src']; $descr=$r['descr']; $exl=$r['exl']; $type=$r['type'];
}
	echo "<a href=''>".$title."</a>".
			" - "."<a href='".$_SERVER['PHP_SELF']."?option=Ads&task=Edit&token=".$id."' class='adm_task_but'>Edit</a>".
			"<hr />";
?>