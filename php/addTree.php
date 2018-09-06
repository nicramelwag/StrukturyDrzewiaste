<?php

$name =filter_input(INPUT_GET, 'name', FILTER_SANITIZE_STRING);

require_once("functions.php");

$conn = polaczDB();
//echo " parentId = ".$id;
//echo " name = ".$name;

$query = "INSERT INTO drzewo (name) VALUES ('".$name."');";
//echo "\n\n".$query;
$conn->query($query);
echo $conn->insert_id;