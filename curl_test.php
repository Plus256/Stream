<?php

$ch=curl_init();
$url='https://api.twitter.com/oauth/request_token';
curl_setopt_array($ch, array(
    CURLOPT_RETURNTRANSFER=>1,
    CURLOPT_URL=>$url,
    CURLOPT_POST=>1,
    CURLOPT_POSTFIELDS=>array(
        
    )
));

if($result=curl_exec($ch)){
    echo $result;
}
else{
    die('Error: "'.curl_error($ch).'" - Code: '.curl_errno($ch));
}
curl_close($ch);

?>