<?php

$db = [
    'db_host' => 'localhost',
    'dbname' => 'tetris',
    'username' => 'root',
    'pass' => '',
    'tableName' => 'scores'
];

$connection = new PDO("mysql:host={$db['db_host']}; dbname={$db['dbname']}; charset=utf8", $db['username'], $db['pass']);
$connection->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

if ($_POST) {
    try {
        $request = $connection->prepare("INSERT INTO {$db['tableName']} (name, scores, timestamp) VALUES (:name, :scores, :timestamp)");

        $request->bindParam(':name', $name);
        $request->bindParam(':scores', $scores);
        $request->bindParam(':timestamp', $timestamp);

        $name = $_POST['name']; //str
        $scores = $_POST['scores'] + 0; //int
        $timestamp = strval(time()); //str

        $affectedRows = $request->execute();
        header('Location: ' . $_SERVER['HTTP_REFERER']);

        //debug($_SERVER);

    } catch (PDOException $e) {
        file_put_contents('log.txt', $e->getMessage(), FILE_APPEND | LOCK_EX);
        header('Location: ' . $_SERVER['HTTP_REFERER']);
    }

}

$request = $connection->prepare("SELECT name, scores, timestamp FROM {$db['tableName']} ORDER BY scores DESC LIMIT 10");
$request->execute();
$result = $request->fetchAll();






function debug($data) {
    echo '<pre style="background: #272822; color: #FFF; padding: 10px; font-size: 15px; word-wrap: break-word;">';
    var_dump($data);
    echo '</pre>';
}