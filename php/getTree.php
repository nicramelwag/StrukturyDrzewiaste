<?php
header('Content-Type: application/json');

$id =filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);

require_once("functions.php");

$conn = polaczDB();

$query = "SELECT * FROM drzewo WHERE id = ".$id;
if ($result = $conn->query($query)) {
    $response = array();
    $row = $result->fetch_assoc();
    $response[0] = array(
        'id' => $row['id'],
        'name'=> $row['name']
    );
    
    $response[1] = array();
    $parentId = $row['id'];
    $response[1] = getAllChildren($parentId, $conn);

    echo json_encode($response); 
    /* free result set */
    $result->free();
}

function getAllChildren($parentId, $conn) {
    $array = array();
    $query = "SELECT * FROM drzewo WHERE parentID = ".$parentId;
    $result = $conn->query($query);
    if ($result = $conn->query($query)) {
        $i = 0;
        while ($row = $result->fetch_assoc()) {
            $array[$i] = array(
                'id' => $row['id'],
                'name'=> $row['name']
            );
            $i++;
            $array[$i] = array();
            $parentId = $row['id'];
            $array[$i] = getAllChildren($parentId, $conn);
            $i++;
        }
        /* free result set */
        $result->free();
    }
    
    return $array;
}