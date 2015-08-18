<?php
require_once("inc/cnf.php");
if(isset($_GET['vkey'])){
  $vkey=$_GET['vkey'];
  //don't you think the user could login using this key from their email and a hot url?
  //we need to either destroy/scramble it after activation, or only use it when their status=0
  $q=mysqli_query($conn, "select id from user where vkey='$vkey' and status=0");
  if(mysqli_num_rows($q)>0){
    $r=mysqli_fetch_assoc($q);
    $u_id=$r['id'];
    //activate user.
    $q=mysqli_query($conn, "update user set status=1 where id=$u_id");
    if($q){//then grant access
      $_SESSION['logged']=$u_id;
      header('Location: ./');
    }
  }
  else{//in case of anything else "funny"
    header('Location: ./');
  }
}
else{//in case of a hot url
  header('Location: ./');//go home
}
?>
