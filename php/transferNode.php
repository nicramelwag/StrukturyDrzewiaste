<?php

$doPrzniesienia =filter_input(INPUT_GET, 'doPrzniesienia', FILTER_VALIDATE_INT);
$cel =filter_input(INPUT_GET, 'cel', FILTER_VALIDATE_INT);

require_once("functions.php");

session_start();
$rootId1 = getRootId($doPrzniesienia);
$rootId2 = getRootId($cel);
$myId = $_SESSION['id'];

if (isMyTree($rootId1, $myId) && isMyTree($rootId2, $myId)) {

    $conn = polaczDB();

    $query = "UPDATE  drzewo SET parentId='".$cel."' WHERE id='".$doPrzniesienia."';";
    //echo "\n\n".$query;
    $conn->query($query);
}