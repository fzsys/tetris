<?php

if ($_POST) {
    try {
        $mask = array("|", ";");
        $name = str_replace($mask, "", $_POST['name']);
        $scores = $_POST['scores'] + 0; //int
        if ($scores > 0) {
            file_put_contents('./base.txt', $name.'|'.$scores.';', FILE_APPEND | LOCK_EX);
        }
    } catch (PDOException $e) {
        file_put_contents('log.txt', $e->getMessage(), FILE_APPEND | LOCK_EX);
        header('Location: ' . $_SERVER['HTTP_REFERER']);
        die();
    }
}

$scores = explode(';',file_get_contents('base.txt'));
$results = [];
foreach ($scores as $score) {
    if (!empty($score)) {
        $results[] = explode('|', $score);
    }
}