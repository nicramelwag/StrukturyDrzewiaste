<?php

	session_start();
        $error = "ok";
        
        $email =filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
        $password =filter_input(INPUT_POST, 'password', FILTER_SANITIZE_SPECIAL_CHARS);
        
        if ($email === false || $email == null)
        {
                $error="Podano nieprawidłowy adres email";
        }
        
        if ((strlen($password)<4) || (strlen($password)>45))
        {
                $error = "Niepoprawne hadło";
        }
	

	require_once("functions.php");

        $conn = polaczDB();

        if ($rezultat = $conn->query(
        sprintf("SELECT * FROM users WHERE email='%s'",
        mysqli_real_escape_string($conn,$email))))
        {
                $ilu_userow = $rezultat->num_rows;
                if($ilu_userow>0)
                {
                        $wiersz = $rezultat->fetch_assoc();

                        if (password_verify($password, $wiersz['password']))
                        {
                                $_SESSION['zalogowany'] = true;
                                $_SESSION['id'] = $wiersz['id'];
                                $_SESSION['email'] = $wiersz['email'];

                                $rezultat->free_result();
                        }
                        else 
                        {
                                $error = "Niepooprawne hasło";
                        }
                } else {

                   $error = "Nie ma użytkownika o takim adresie email";

                }

        }

        $conn->close();

echo $error;