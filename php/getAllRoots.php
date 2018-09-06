<?php
header('Content-Type: application/json');

require_once("functions.php");

$conn = polaczDB();
$query = "SELECT * FROM drzewo WHERE parentID IS NULL";
if ($result = $conn->query($query)) {
    $response = array();
    $i = 0;
    while ($row = $result->fetch_assoc()) {
        $response[$i] = array(
            'id' => $row['id'],
            'name'=> $row['name']
        );
        $i++;
    }
    echo json_encode($response); 
    /* free result set */
    $result->free();
}