<?php

if (isset($_POST['email']))
{
    //Udana walidacja? Załóżmy, że tak!
    $error="ok";


    // Sprawdź poprawność adresu email
    $email =filter_input(INPUT_POST, 'email', FILTER_VALIDATE_EMAIL);
    $password =filter_input(INPUT_POST, 'password', FILTER_SANITIZE_SPECIAL_CHARS);
    $password2 =filter_input(INPUT_POST, 'password2', FILTER_SANITIZE_SPECIAL_CHARS);


    if ($email === false || $email == null)
    {
            $error="Podano nieprawidłowy adres email";
    }

    if ((strlen($password)<4) || (strlen($password)>45))
    {
            $error = "Długość hasła jest niepoprawna. Hasło musimieć co najmniej 4 znaki oraz może mieć maksymalnie 45";
    }

    if ($password!=$password2)
    {
            $error = "podane hasła są różne";
    }	

    $passwordHash = password_hash($password, PASSWORD_DEFAULT);


    require_once("functions.php");

    $conn = polaczDB();

    //Czy email już istnieje?
    $rezultat = $conn->query("SELECT id FROM users WHERE email='$email'");

    //if (!$rezultat) throw new Exception($polaczenie->error);

    $ile_takich_maili = $rezultat->num_rows;
    if($ile_takich_maili>0)
    {
        $error = "Podany email jest już zajęty.";
    }		

    if ($error==="ok")
    {
            if ($conn->query("INSERT INTO users VALUES (NULL, '$email', '$passwordHash')"))
            {
            }
            else
            {
                $error = "Niepoprawne połączenie z bazą danych. Sprój zarejestrować się później";
                    //throw new Exception($polaczenie->error);
            }

    }

    $conn->close();




    echo $error;

}
