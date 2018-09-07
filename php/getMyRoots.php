<?php
header('Content-Type: application/json');

session_start();
$response = array();

if(isset($_SESSION['zalogowany'])) {
    require_once("functions.php");
    
    $id = $_SESSION['id'];

    $conn = polaczDB();
    $query = "SELECT * FROM tree WHERE idUser=".$id;
    if ($result = $conn->query($query)) {
        
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
        
        /* free result set */
        $result->free();
    }
}

echo json_encode($response); 