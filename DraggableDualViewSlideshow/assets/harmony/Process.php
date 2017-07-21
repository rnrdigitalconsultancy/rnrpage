<?php
//secure this file
include("Functions.php");
session_start();
$function = new DatabaseClasses;
    if(isset($_GET['send-mail'])){
        $data = $_POST['data'];

        $headers  = 'MIME-Version: 1.0' . "\r\n";
        $headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";
        $headers .= 'From: RNR Digital Consultancy <rnrdigitalconsultancy.com>' . "\r\n";
        $receiver = $data[0];
        $subject =  $data[1];
        $message = $data[2];

        $result = mail($receiver,$subject,$message,$headers);
        print_r($result);
    }
?>