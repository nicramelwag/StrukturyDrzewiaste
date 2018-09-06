<?php
require_once("functions.php");

$conn = polaczDB();

$id =filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);

usunWezel($conn, $id);

function usunWezel($conn,$id) {
    $query = "SELECT * FROM drzewo WHERE parentId='{$id}';";
    if ($result = $conn->query($query)) {
        while($row = $result->fetch_assoc()) {
              usunWezel($conn,$row['id']);
	}

	usunKonkretnyWezel($conn,$id);
    }
}

function usunKonkretnyWezel($conn,$id){
    $query = "DELETE FROM drzewo WHERE id='$id';";
    if ($result = $conn->query($query)) {
        if($conn->affected_rows > 0) {
            echo "\nUsunieto ".$id;
        }
    }
}
