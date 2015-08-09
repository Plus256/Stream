<?php

$authToken = '047C0E52-7145-47B9-8E3B-3DBA112EBBEE';

// The data to send to the API
$postData = array('number' => '+256723074711', 'type' => 'cli');

// Setup cURL
$ch = curl_init('https://api.checkmobi.com/v1/validation/request');
curl_setopt_array($ch, array(CURLOPT_POST => TRUE, CURLOPT_RETURNTRANSFER => TRUE,
    CURLOPT_HTTPHEADER => array('Authorization: '.$authToken,'Content-Type: application/json' ),
    CURLOPT_POSTFIELDS => json_encode($postData)
));

//optional
curl_setopt($ch, CURLOPT_SSL_VERIFYHOST, 0);
curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, 0);

// Send the request
$response = curl_exec($ch);

// Check for errors
if($response === FALSE){
    die(curl_error($ch));
}

// Decode the response
$responseData = json_decode($response, TRUE);

//print_r($responseData);

foreach($responseData as $attr){
    //echo $responseData[0]=>$attr;
    unset($attr);
}

?>