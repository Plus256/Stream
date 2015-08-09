<?php
require_once("cnf.php");
require_once("mail.php");
require_once __DIR__ . '/facebooklib/autoload.php';
if(isset($_GET['fetch_shule'])){
	$data=array();
	$q=mysqli_query($conn, "select *, s.id as sid, u.fname, u.lname from shule as s join pic as p join user as u on s.author=u.id and s.cover=p.id where s.status=1 order by s.id desc limit 1,6");
	$qt=mysqli_query($conn, "select id from shule");
	$tot_r=mysqli_num_rows($qt);
	while($r=mysqli_fetch_assoc($q)){
		$id=$r['sid']; $title=$r['title']; $cover=$r['src']; $intro=$r['body']; $published=$r['created']; $author=$r['fname']." ".$r['lname']; $category=$r['category'];
		$published=elapsedTime($published);
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
		$rec=array("id"=>$id, "title"=>$title, "cover"=>$cover, "intro"=>$intro, "published"=>$published, "author"=>$author, "category"=>$category, "tot_r"=>$tot_r);
		array_push($data, $rec);
	}
	echo json_encode($data);
}

if(isset($_GET['top_shule'])){
	$data=array();
	$q=mysqli_query($conn, "select *, s.id as sid, u.fname, u.lname from shule as s join pic as p join user as u on s.author=u.id and s.cover=p.id where s.status=1 order by s.id desc limit 1");
	while($r=mysqli_fetch_assoc($q)){
		$id=$r['sid']; $title=$r['title']; $cover=$r['src']; $intro=$r['body']; $published=$r['created']; $author=$r['fname']." ".$r['lname']; $category=$r['category'];
		$published=elapsedTime($published);
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
		$rec=array("id"=>$id, "title"=>$title, "cover"=>$cover, "intro"=>$intro, "published"=>$published, "author"=>$author, "category"=>$category);
		array_push($data, $rec);
	}
	echo json_encode($data);
}

if(isset($_GET['shule_cat'])){
	$shule_cat=$_GET['cat_id'];
	switch($shule_cat){
		case "Apps": $shule_cat=1; break;
		case "Gadgets": $shule_cat=2; break;
		case "Startups": $shule_cat=3; break;
		case "Social": $shule_cat=4; break;
		case "Multimedia": $shule_cat=5; break;
		case "Code": $shule_cat=6; break;
		case "Internet": $shule_cat=7; break;
	}
	$data=array();
	$q=mysqli_query($conn, "select *, s.id as sid, u.fname, u.lname from shule as s join pic as p join user as u on s.author=u.id and s.cover=p.id where s.category=$shule_cat and s.status=1 order by s.id desc limit 6");
	while($r=mysqli_fetch_assoc($q)){
		$id=$r['sid']; $title=$r['title']; $cover=$r['src']; $intro=$r['body']; $published=$r['created']; $author=$r['fname']." ".$r['lname']; $category=$r['category'];
		$published=elapsedTime($published);
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
		$rec=array("id"=>$id, "title"=>$title, "cover"=>$cover, "intro"=>$intro, "published"=>$published, "author"=>$author, "category"=>$category);
		array_push($data, $rec);
	}
	echo json_encode($data);
}

if(isset($_GET['more_shule'])){
	$shule_id=$_GET['shule_id'];
	$q_v=mysqli_query($conn, "update shule set views=views+1 where id=$shule_id");
	$q=mysqli_query($conn, "select *, s.id, u.fname, u.lname as sid from shule as s join pic as p join user as u on s.author=u.id and s.cover=p.id where s.id=$shule_id");
	$r=mysqli_fetch_assoc($q);
	$id=$r['sid']; $title=$r['title']; $cover=$r['src']; $intro=$r['body']; $published=$r['created']; $author=$r['fname']." ".$r['lname']; $category=$r['category']; $views=$r['views'];
	$published=elapsedTime($published);
	switch($category){
		case 1: $category="Apps"; break;
		case 2: $category="Gadgets"; break;
		case 3: $category="Startups"; break;
		case 4: $category="Social"; break;
		case 5: $category="Multimedia"; break;
		case 6: $category="Code"; break;
		case 7: $category="Internet"; break;
	}
	$data=array("id"=>$id, "title"=>$title, "cover"=>$cover, "intro"=>$intro, "published"=>$published, "author"=>$author, "category"=>$category, "views"=>$views);
	echo json_encode($data);
}

if(isset($_GET['fill_right'])){
	$shule_id=$_GET['shule_id'];
	$data=array();
	$q=mysqli_query($conn, "select *, s.id as sid, u.fname, u.lname from shule as s join pic as p join user as u on s.author=u.id and s.cover=p.id where s.id!=$shule_id and s.status=1 order by s.id desc limit 6");
	while($r=mysqli_fetch_assoc($q)){
		$id=$r['sid']; $title=$r['title']; $cover=$r['src']; $intro=$r['body']; $published=$r['created']; $author=$r['fname']." ".$r['lname']; $category=$r['category'];
		$published=elapsedTime($published);
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
		$rec=array("id"=>$id, "title"=>$title, "cover"=>$cover, "intro"=>$intro, "published"=>$published, "author"=>$author, "category"=>$category);
		array_push($data, $rec);
	}
	echo json_encode($data);
}

function trunc($phrase, $max_words, $this_shule){
	$phrase_array=explode(" ", $phrase);
	if(count($phrase_array)>$max_words && $max_words>0){
		$phrase=implode(" ", array_slice($phrase_array, 0, $max_words))."... "."<a class='read_more' href='shule.php?id=".$this_shule."'>More</a>";
	}
	return $phrase;
}

if(isset($_GET['load_more'])){
    $l_id=$_GET['l_id'];
	$data=array();
	$q=mysqli_query($conn, "select *, s.id as sid, u.fname, u.lname from shule as s join pic as p join user as u on s.author=u.id and s.cover=p.id where s.id<$l_id and s.status=1 order by s.id desc limit 6");
	$qt=mysqli_query($conn, "select id from shule");
	$tot_r=mysqli_num_rows($qt);
	while($r=mysqli_fetch_assoc($q)){
		$id=$r['sid']; $title=$r['title']; $cover=$r['src']; $intro=$r['body']; $published=$r['created']; $author=$r['fname']." ".$r['lname']; $category=$r['category'];
		$published=elapsedTime($published);
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
		$rec=array("id"=>$id, "title"=>$title, "cover"=>$cover, "intro"=>$intro, "published"=>$published, "author"=>$author, "category"=>$category, "tot_r"=>$tot_r);
		array_push($data, $rec);
	}
	echo json_encode($data);
}

if(isset($_GET['fetch_ad'])){
	$data=array();
	$q=mysqli_query($conn, "select *, a.id as aid from ad as a join pic as p on a.pic=p.id where a.status=1 order by a.id desc limit 5");
	while($r=mysqli_fetch_assoc($q)){
		$id=$r['aid']; $title=$r['title']; $pic=$r['src']; $descr=$r['descr']; $exl=$r['exl']; $type=$r['type'];
		$rec=array("id"=>$id, "title"=>$title, "pic"=>$pic, "descr"=>$descr, "exl"=>$exl, "type"=>$type);
		array_push($data, $rec);
	}
	echo json_encode($data);
}

if(isset($_GET['fetch_poll'])){
	$data=array();
	$q=mysqli_query($conn, "select *, c.id as cid from p_cand as c join poll as pp join pic as p on c.poll=pp.id and c.cover=p.id where pp.status=1 order by c.id asc");
	while($r=mysqli_fetch_assoc($q)){
		$id=$r['cid']; $poll=$r['poll']; $topic=$r['topic']; $pic=$r['src']; $descr=$r['descr']; $votes=$r['votes']; $cat=$r['category']; $start=$r['created'];
		$votes=voteShare($votes, $poll)."%";
		$total="Total Votes: ".totalVotes($poll);
		$start=elapsedTime($start);
		switch($cat){
			case 1: $cat="Apps"; break;
			case 2: $cat="Gadgets"; break;
			case 3: $cat="Startups"; break;
			case 4: $cat="Social"; break;
			case 5: $cat="Multimedia"; break;
			case 6: $cat="Code"; break;
			case 7: $cat="Internet"; break;
		}
		$rec=array("id"=>$id, "topic"=>$topic, "pic"=>$pic, "descr"=>$descr, "votes"=>$votes, "total"=>$total, "cat"=>$cat, "start"=>$start);
		array_push($data, $rec);
	}
	echo json_encode($data);
}

if(isset($_GET['vote'])){
	$data=array();
	$p_cand=$_GET['vote'];
	$q=mysqli_query($conn, "select votes from p_cand where id=$p_cand");
	if($q){
		$r=mysqli_fetch_assoc($q);
		$votes=$r['votes']; $votes++;
		$q=mysqli_query($conn, "update p_cand set votes=$votes where id=$p_cand");
		if($q){
			echo '{"ret":"1"}';
		}
	}
}

if(isset($_GET['poll_result'])){
	$data=array();
	$q=mysqli_query($conn, "select *, c.id as cid from p_cand as c join poll as pp join pic as p on c.poll=pp.id and c.cover=p.id where pp.status=1 order by c.id asc");
	while($r=mysqli_fetch_assoc($q)){
		$id=$r['cid']; $poll=$r['poll']; $topic=$r['topic']; $pic=$r['src']; $descr=$r['descr']; $votes=$r['votes']; $cat=$r['category']; $start=$r['created'];
		$votes=voteShare($votes, $poll)."%";
		$total="Total Votes: ".totalVotes($poll);
		$start=elapsedTime($start);
		switch($cat){
			case 1: $cat="Apps"; break;
			case 2: $cat="Gadgets"; break;
			case 3: $cat="Startups"; break;
			case 4: $cat="Social"; break;
			case 5: $cat="Multimedia"; break;
			case 6: $cat="Code"; break;
			case 7: $cat="Internet"; break;
		}
		$rec=array("id"=>$id, "topic"=>$topic, "pic"=>$pic, "descr"=>$descr, "votes"=>$votes, "total"=>$total, "cat"=>$cat, "start"=>$start);
		array_push($data, $rec);
	}
	echo json_encode($data);
}

function voteShare($p_cand_share, $poll){
	$percent;
	$total=0;
	$q=mysqli_query($conn, "select votes from p_cand where poll=$poll");
	while($r=mysqli_fetch_assoc($q)){
		$total+=$r['votes'];
	}
	$percent=floor(($p_cand_share/$total)*100);
	return $percent;
}

function totalVotes($poll){
	$total=0;
	$q=mysqli_query($conn, "select votes from p_cand where poll=$poll");
	while($r=mysqli_fetch_assoc($q)){
		$total+=$r['votes'];
	}
	return $total;
}

if(isset($_GET['send_msg'])){
    if(!empty($_POST['frm'])){
		$mail_check=spamCheck($_POST['frm']);
		if($mail_check==false){
			echo '{"ret":"0"}';
		}
		else{
			if(!empty($_POST['msg']) && $_POST['msg']!="Write Message Here..." && preg_match("/^[0-9a-zA-Z]+/", $_POST['msg'])){
				$to="info@techshule.com";
				$frm=cleanInput($_POST['frm']);
				$sbj=cleanInput($_POST['sbj']);
				$msg=cleanInput($_POST['msg']);

				$q=mysqli_query($conn, "select id, email from news_l where email='$frm'");
			    if(mysqli_num_rows($q)>0){
			    	//email exists in our news_l subscriptions
			    	sendMsg($to, $frm, $sbj, $msg);
			    }
			    else{//new email
			    	$q=mysqli_query($conn, "insert into news_l (email) values ('$frm')");
			    	if($q){
			    		sendMsg($to, $frm, $sbj, $msg);
			    	}
			    }
			}
			else{
				echo '{"ret":"1"}';
			}
		}
	}
	else{
		echo '{"ret":"0"}';
	}
}

function spamCheck($field){
	//sanitize email
	$field=filter_var($field, FILTER_SANITIZE_EMAIL);
	//validate email
	if(filter_var($field, FILTER_VALIDATE_EMAIL)){
		return true;
	}
	else{
		return false;
	}
}

function cleanInput($data){
	$data = trim($data);
	$data = stripslashes($data);
	$data = strip_tags($data, "<br>");
	return $data;
}

function elapsedTime($t_stamp){
	$occurred=strtotime($t_stamp)+(7*60*60);//add 7 hours to cater for Ugandan Time Zone
	$diff=time()-$occurred;
	if($diff<60){
		$elapsed=$diff;
		if($elapsed==1){
			$elapsed=$elapsed." Second";
		}
		else{
			$elapsed=$elapsed." Seconds";
		}
	}
	elseif($diff>=60 && $diff<(60*60)){
		$elapsed=floor($diff/(60));
		if($elapsed==1){
			$elapsed=$elapsed." Minute";
		}
		else{
			$elapsed=$elapsed." Minutes";
		}
	}
	elseif($diff>=(60*60) && $diff<(60*60*24)){
		$elapsed=floor($diff/(60*60));
		if($elapsed==1){
			$elapsed=$elapsed." Hour";
		}
		else{
			$elapsed=$elapsed." Hours";
		}
	}
	elseif($diff>=(60*60*24) && $diff<(60*60*24*7)){
		$elapsed=floor($diff/(60*60*24));
		if($elapsed==1){
			$elapsed=$elapsed." Day";
		}
		else{
			$elapsed=$elapsed." Days";
		}
	}
	else{
		$elapsed=date("M jS, Y", $occurred);
	}
	return $elapsed;
}






if(isset($_GET['fb_page_feed'])){





/*$fb = new Facebook\Facebook([
  'app_id' => '482219788583361',
  'app_secret' => '7cece7395ee556e50678418da4c724c9',
  'default_graph_version' => 'v2.2',
  ]);



//




try {
  // Returns a `Facebook\FacebookResponse` object
  $response = $fb->get('/me?fields=id,name', '482219788583361|hKl9uoyyU6FwifKMLd-mWLsGR1Y');
} catch(Facebook\Exceptions\FacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}

$user = $response->getGraphUser();

echo 'Name: ' . $user['name'];
// OR
// echo 'Name: ' . $user->getName();*/













$fb_page_id = "488144804661108";
$access_token = "482219788583361|hKl9uoyyU6FwifKMLd-mWLsGR1Y";
$fields = "id,message,full_picture,link,name,description,type,icon,created_time,from,object_id";//use full_picture instead of picture
$limit = 5;


//$profile_photo_src = "https://graph.facebook.com/".$fb_page_id."/picture?type=square";


$json_link = "https://graph.facebook.com/v2.4/".$fb_page_id."/feed?access_token=".$access_token."&fields={$fields}&limit={$limit}";

try{


$ch = curl_init();
curl_setopt ($ch, CURLOPT_URL, $json_link);
curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 5);
curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
$json = curl_exec($ch);
if (curl_errno($ch)) {
  echo curl_error($ch);
  echo "\n<br />";
  $json = '';
} else {
  curl_close($ch);
}

if (!is_string($json) || !strlen($json)) {
echo "Failed to get contents.";
$json = '';
}

echo $json;



} catch(Facebook\Exceptions\FacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}






/*$base_api="https://graph.facebook.com/";
$client_id="482219788583361";
$app_secret="7cece7395ee556e50678418da4c724c9";
$profile_id="386019671485200";


$app = new Facebook\Facebook([
  'app_id' => $client_id,
  'app_secret' => $app_secret,
  'default_graph_version' => 'v2.2',
  ]);



try {

//$response = $fb->get('/me?fields=id,name', '482219788583361|hKl9uoyyU6FwifKMLd-mWLsGR1Y');


//get a profile feed (can be from a page, user, event, group)
$app->get(''.$profile_id.'/feed', function ($profile_id) {


    $request = new FacebookRequest(
      getSession(),
      'GET',
      '/'.$profile_id.'/feed'
    );

    $response = $request->execute();
    $graphObject = $response->getGraphObject();

    echo $graphObject;

});




} catch(Facebook\Exceptions\FacebookResponseException $e) {
  echo 'Graph returned an error: ' . $e->getMessage();
  exit;
} catch(Facebook\Exceptions\FacebookSDKException $e) {
  echo 'Facebook SDK returned an error: ' . $e->getMessage();
  exit;
}




function getSession(){
    $session = new FacebookSession(getAccessToken());
    return $session;
}


function getAccessToken(){
    global $base_api, $client_id, $app_secret;
    $url=$base_api."oauth/access_token?client_id=".$client_id."&client_secret=".$app_secret."&grant_type=client_credentials";


    $ch = curl_init();
    curl_setopt ($ch, CURLOPT_URL, $url);
    curl_setopt ($ch, CURLOPT_CONNECTTIMEOUT, 5);
    curl_setopt ($ch, CURLOPT_RETURNTRANSFER, true);
    $str = curl_exec($ch);
    if (curl_errno($ch)) {
    echo curl_error($ch);
    echo "\n<br />";
    $str = '';
    } else {
    curl_close($ch);
    }

    if (!is_string($str) || !strlen($str)) {
    echo "Failed to get contents.";
    $str = '';
    }


    //$str = file_get_contents($url);
    $token = str_replace ( "access_token=" , "" , $str );
    return $token;
}*/










}




?>
