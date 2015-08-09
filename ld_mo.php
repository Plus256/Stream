<?php
require_once("cnf.php");
if(isset($_GET['load_more'])){
    $l_id=$_GET['l_id'];
	$data=array();
	$q=mysql_query("select *, s.id as sid from shule as s join pic as p join user as u on s.author=u.id and s.cover=p.id where s.id<$l_id order by s.id desc limit 6");
	$qt=mysql_query("select id from shule");
	$tot_r=mysql_num_rows($qt);
	while($r=mysql_fetch_assoc($q)){
		$id=$r['sid']; $title=$r['title']; $cover=$r['src']; $intro=$r['body']; $published=$r['created']; $category=$r['category'];
		$intro=trunc($intro,25, $id);
		switch($category){
			case 1: $category="Apps"; break;
			case 2: $category="Gadgets"; break;
			case 3: $category="Startups"; break;
			case 4: $category="Social"; break;
			case 5: $category="Multimedia"; break;
			case 6: $category="Code"; break;
			case 7: $category="Internet"; break;
		}
		$rec=array("id"=>$id, "title"=>$title, "cover"=>$cover, "intro"=>$intro, "published"=>$published, "category"=>$category, "tot_r"=>$tot_r);
		array_push($data, $rec);
	}
	echo json_encode($data);
}
?>