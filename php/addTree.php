<?php
session_start();
$root =filter_input(INPUT_POST, 'root', FILTER_SANITIZE_STRING);
$title =filter_input(INPUT_POST, 'title', FILTER_SANITIZE_STRING);
$description =filter_input(INPUT_POST, 'description', FILTER_SANITIZE_STRING);

require_once("functions.php");

$conn = polaczDB();

$query = "INSERT INTO drzewo (name) VALUES ('".$root."');";
$conn->query($query);
$insertId = $conn->insert_id;
$id = $_SESSION['id'];

$query = "INSERT INTO tree VALUES (NULL, '$id', '$insertId', '$title', '$description');";
$conn->query($query);

echo $conn->insert_id;