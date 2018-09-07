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

    $query = "UPDATE  drzewo SET name='".$name."' WHERE id='".$id."';";
    //echo "\n\n".$query;
    $conn->query($query);
}