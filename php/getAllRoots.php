<?php
header('Content-Type: application/json');

require_once("functions.php");

$conn = polaczDB();
$query = "SELECT * FROM tree";
if ($result = $conn->query($query)) {
    $response = array();
    $i = 0;
    while ($row = $result->fetch_assoc()) {
        $response[$i] = array(
            'id' => $row['id'],
            'idUser'=> $row['idUser'],
            'idRoot'=> $row['idRoot'],
            'title'=> $row['title'],
            'description'=> $row['description'],
        );
        $i++;
    }
    echo json_encode($response); 
    /* free result set */
    $result->free();
}