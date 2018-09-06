<?php

function polaczDB() {

    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "strukturydrzewiaste";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);
    mysqli_set_charset($conn, "utf8");

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    } else {
        return $conn;
    }
}