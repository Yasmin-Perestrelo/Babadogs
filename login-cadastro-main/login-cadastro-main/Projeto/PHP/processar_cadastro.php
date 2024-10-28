<?php
// Habilitar exibição de erros (apenas para desenvolvimento)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Configurações do banco de dados
$host = "blamelessly-apposite-pup.data-1.use1.tembo.io";
$port = "5432";
$dbname = "banco_de_dados_baba"; // Nome do seu banco de dados (sem espaços)
$username = "postgres";
$password = "vnLhF17xCZ5KkQAD";

// Conexão
$conn_string = "host=$host port=$port dbname=$dbname user=$username password=$password";
$conn = pg_connect($conn_string);

// Verifica a conexão
if (!$conn) {
    die("Conexão falhou: " . pg_last_error());
} else {
    echo "Conexão estabelecida com sucesso!<br>";
}

// Captura os dados do formulário
$nome = $_POST['name'] ?? ''; // Usando null coalescing para evitar notices
$email = $_POST['email'] ?? '';
$telefone = $_POST['telefone'] ?? '';
$senha = password_hash($_POST['password'] ?? '', PASSWORD_DEFAULT); // Hash da senha
$data_nascimento = $_POST['data_nascimento'] ?? '';
$sexo = $_POST['sexo'] ?? '';

// Prepara e executa a inserção
$query = "INSERT INTO usuarios (nome, email, telefone, senha, data_nascimento, sexo) VALUES ($1, $2, $3, $4, $5, $6)";
$result = pg_query_params($conn, $query, array($nome, $email, $telefone, $senha, $data_nascimento, $sexo));

// Verifica se a inserção foi bem-sucedida
if ($result) {
    echo "Novo registro criado com sucesso";
} else {
    echo "Erro ao criar registro: " . pg_last_error($conn);
}

// Fecha a conexão
pg_close($conn);
?>

