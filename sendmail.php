<?php
require __DIR__ . '/vendor/autoload.php';
$sendgrid_apikey='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';
$sendgrid = new SendGrid($sendgrid_apikey);
$email = new SendGrid\Email();
$email
    ->addTo('wagabaplus256@gmail.com')
    ->setFrom('stream@plus256.com')
    ->setSubject('SendGrid Test')
    ->setText('Hello World!')
    ->setHtml('<strong>Hello World!</strong>')
;

//$sendgrid->send($email);

// Or catch the error

try {
    $sendgrid->send($email);
} catch(\SendGrid\Exception $e) {
    echo $e->getCode();
    foreach($e->getErrors() as $er) {
        echo $er;
    }
}
?>