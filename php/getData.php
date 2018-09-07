<?php
header('Content-Type: application/json');

session_start();
$response;

if (isset($_SESSION['zalogowany'])) {
    $response= array(
        'zalogowany' => $_SESSION['zalogowany'],
        'id'=> $_SESSION['id'],
        'email' => $_SESSION['email']
    );
} else {
    $response = array(
        'zalogowany' => false);
}



echo json_encode($response); 
