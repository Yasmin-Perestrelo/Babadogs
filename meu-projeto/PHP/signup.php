<?php
// Conexão com o banco de dados
$host = "latterly-corking-dachshund.data-1.use1.tembo.io";
$port = "5432";
$dbname = "postgres";
$user = "postgres";
$password = "CCEfyzKyk9quc7mZ"; 

$conn = pg_connect("host=$host port=$port dbname=$dbname user=$user password=$password");

// Verifica se a conexão foi bem-sucedida
if (!$conn) {
    die("Erro de conexão: " . pg_last_error());
}

// Verifica se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $email = $_POST['email'];
    $phone = $_POST['phone'];
    $birthdate = $_POST['birthdate'];
    $gender = $_POST['gender'];
    $cpf = $_POST['cpf'];
    $password = $_POST['password'];

    // Insere os dados no banco de dados
    $query = "INSERT INTO users (name, email, phone, birthdate, gender, cpf, password) VALUES ($1, $2, $3, $4, $5, $6, $7)";
    $result = pg_query_params($conn, $query, array($name, $email, $phone, $birthdate, $gender, $cpf, password_hash($password, PASSWORD_DEFAULT)));

    if ($result) {
        echo "Cadastro realizado com sucesso!";
    } else {
        echo "Erro no cadastro: " . pg_last_error();
    }
}

// Fecha a conexão
pg_close($conn);
?>
