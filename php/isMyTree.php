<?php

session_start();
        
    if(isset($_SESSION['zalogowany'])) {
        $id =filter_input(INPUT_GET, 'id', FILTER_VALIDATE_INT);
        
        $myId = $_SESSION['id'];

	require_once("functions.php");

        if (isMyTree($id, $myId)){
            echo "true";
        }
        else {
            echo "false";
        }
    
    } else {
        echo "false";
    }