<?php
ini_set('display_errors', 1);
require_once('TwitterAPIExchange.php');

/** Set access tokens here - see: https://dev.twitter.com/apps/ **/
$settings = array(
    'oauth_access_token' => "3034573240-h18A6XDV6nh9tGkdb8OGU6B08hDxFdcQYbT7YhW",
    'oauth_access_token_secret' => "IgJCHLqhTe8jT8s3gmgV7IafTpo4QhjMVhpZNhGEMabVw",
    'consumer_key' => "vI9SHm24BpRh2ccRGiIMU1Oui",
    'consumer_secret' => "Jt9PPtTqeTiA4FOkdUa2Bn8PWTScWKD49KbSui6zvoHqiWigJk"
);

/** URL for REST request, see: https://dev.twitter.com/docs/api/1.1/ **
$url = 'https://api.twitter.com/1.1/blocks/create.json';
$requestMethod = 'POST';

/** POST fields required by the URL above. See relevant docs as above **
$postfields = array(
    'screen_name' => 'usernameToBlock',
    'skip_status' => '1'
);

/** Perform a POST request and echo the response **
$twitter = new TwitterAPIExchange($settings);
echo $twitter->buildOauth($url, $requestMethod)
             ->setPostfields($postfields)
             ->performRequest();

/** Perform a GET request and echo the response **/
/** Note: Set the GET field BEFORE calling buildOauth(); **/
$url = 'https://api.twitter.com/1.1/search/tweets.json';
$getfield = '?q=%23africankid';
$requestMethod = 'GET';
$twitter = new TwitterAPIExchange($settings);
echo $twitter->setGetfield($getfield)
             ->buildOauth($url, $requestMethod)
             ->performRequest();
