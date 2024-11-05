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
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Busca o usuário no banco de dados
    $query = "SELECT * FROM users WHERE email = $1";
    $result = pg_query_params($conn, $query, array($email));

    if ($result && pg_num_rows($result) > 0) {
        $user = pg_fetch_assoc($result);
        
        // Verifica a senha
        if (password_verify($password, $user['password'])) {
            echo "Login bem-sucedido! Bem-vindo, " . htmlspecialchars($user['name']) . ".";
        } else {
            echo "Senha incorreta.";
        }
    } else {
        echo "Usuário não encontrado.";
    }
}


pg_close($conn);
?>
