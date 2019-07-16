<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport"
          content="width=device-width, user-scalable=no, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>tetris</title>
    <link rel="stylesheet" href="css/main.css">
    <link rel="shortcut icon" href="icon.png"/>
    <link href="https://fonts.googleapis.com/css?family=Bahianita&display=swap" rel="stylesheet">
</head>
<body>
<div class="container">
    <header>
        <h1 class="text-center">
            <?php require_once 'handler.php'; ?>
            Simple Tetris
        </h1>
    </header>
    <main>
        <div class="block tetris-block">
            <div class="tetris-wrap">
                <div id="tetris-field">
                    <div class="start-block">
                        <button class="start">Lets start</button>
                        <ul class="rules text-center text-mobile-show">
                            <li>- press the button "START"</li>
                            <li>- left/right arrows to move</li>
                            <li>- put 3 blocks in the row</li>
                            <li>- every row its 5 point</li>
                        </ul>
                    </div>
                </div>
                <div class="controller-block">
                    <button class="left" disabled></button>
                    <button class="down" disabled></button>
                    <button class="right" disabled></button>
                </div>
            </div>
        </div>

        <div class="block text-field">
            <ul class="rules text-center">
                <li>- press the button "START"</li>
                <li>- left/right arrows to move</li>
                <li>- put 3 blocks in the row</li>
                <li>- every row its 5 point</li>
            </ul>
            <div class="score-field text-center">
                <span>Total scores: </span><span class="scores">0</span>
            </div>
            <div class="form">
            </div>
            <div class="top-results">
                <h2 class="text-center">Top results</h2>
                <?php
                if ($result) {
                    foreach ($result as $key => $item) {
                        if (!empty($item['name'])) {
                            echo '<p class="results-item text-center">' . $item['name'] . ': ' . $item['scores'] . '</p>';
                        }
                    }
                } else {
                    echo '<p class="results-item text-center">are no results yet!</p>';
                }
                ?>
            </div>
        </div>
    </main>
</div>
<script src="js/main.js"></script>
</body>
</html>
