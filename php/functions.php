<?php

function polaczDB() {

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "strukturydrzewiaste";

    // Create connection
    $conn = @new mysqli($servername, $username, $password, $dbname);
    @mysqli_set_charset($conn, "utf8");

    if ($conn->connect_error) {
        echo "nieprawidłowe połączenie z bazą danych";
        exit;
    } else {
        return $conn;
    }
}

function getRootId($id){
    $parentId = getParentId($id);
    if ($parentId == NULL) {
        return $id;
    } else {
        return getRootId($parentId);
    }
    
}

function getParentId($id){
    $conn = polaczDB();
    $query = "SELECT * FROM drzewo WHERE id='$id'";
    if ($result = $conn->query($query)) {

        if ($row = $result->fetch_assoc()) {
            return $row['parentId'];
        } 
        /* free result set */
        $result->free();
    }
}

function isMyTree($id, $myId) {
       $conn = polaczDB();

        if ($rezultat = $conn->query("SELECT * FROM tree WHERE idRoot='$id' AND idUser='$myId'"))
        {
                $ilosc = $rezultat->num_rows;
                if($ilosc>0)
                {
                    return true;
                } else {
                   return false;
                }

        }

        $conn->close();
}