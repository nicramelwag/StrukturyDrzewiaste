<?php

$id =filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
$name =filter_input(INPUT_GET, 'name', FILTER_SANITIZE_STRING);

require_once("functions.php");

session_start();
$rootId = getRootId($id);
$myId = $_SESSION['id'];

if (isMyTree($rootId, $myId)) {
    $conn = polaczDB();
    //echo " parentId = ".$id;
    //echo " name = ".$name;

    $query = "INSERT INTO drzewo (name, parentId) VALUES ('".$name."', ".$id.");";
    //echo "\n\n".$query;
    $conn->query($query);
    echo $conn->insert_id;
}

