// execute this code after DOM was loaded
window.onload = function () {
    let tetris = [];
    let tetrisField = document.querySelector('#tetris-field');
    let scoreField = document.querySelector('.scores');
    let numOfColors = 5;
    let score = 0;
    let flag;

    init();
    draw();
    square();
    document.querySelector('.start').onclick = run;
    document.onkeydown = function (event) {
        console.log(event);
        switch (event.code) {
            case "ArrowRight":
                moveRight();
                break;
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowDown":
                moveDown();
                break;
        }
        return false;
    }

    function init() {
        let x = 9;
        let y = 15;

        for (let i = 0; i < y; i++) {
            tetris[i] = [];
            for (let j = 0; j < x; j++) {
                tetris[i][j] = 0;
            }
        }
    }

    function draw() {
        let out = '';
        for (let i = 0; i < tetris.length; i++) {
            for (let j = 0; j < tetris[i].length; j++) {
                if (tetris[i][j] == 0) {
                    out += '<div class="tetris-item"></div>';
                } else if (tetris[i][j] == 1 || tetris[i][j] == 11) {
                    out += '<div class="tetris-item red"></div>';
                } else if (tetris[i][j] == 2 || tetris[i][j] == 12) {
                    out += '<div class="tetris-item green"></div>';
                } else if (tetris[i][j] == 3 || tetris[i][j] == 13) {
                    out += '<div class="tetris-item yellow"></div>';
                } else if (tetris[i][j] == 4 || tetris[i][j] == 14) {
                    out += '<div class="tetris-item blue"></div>';
                } else if (tetris[i][j] == 5 || tetris[i][j] == 15) {
                    out += '<div class="tetris-item orange"></div>';
                }
            }
        }
        tetrisField.innerHTML = out;
        scoreField.innerHTML = score;
        console.table(tetris);
    }

    function square() {
        function randomInteger(min, max) {
            let rand = min + Math.random() * (max + 1 - min);
            rand = Math.floor(rand);
            return rand;
        }

        tetris[0][0] = randomInteger(0, numOfColors);
    }

    function run() {
        draw();
        flag = true;
        for (let i = tetris.length - 1; i >= 0; i--) {
            for (let j = 0; j < tetris[i].length; j++) {
                if (tetris[i][j] < 10) {
                    if (tetris[i][j] != 0) {
                        if (i == tetris.length - 1 || tetris[i + 1][j] > 10) {
                            tetris[i][j] = tetris[i][j] + 10;
                        } else if (tetris[i + 1][j] == 0) {
                            tetris[i + 1][j] = tetris[i][j];
                            tetris[i][j] = 0;
                            flag = false;
                        }
                    }
                }
            }
        }
        if (flag) {
            square();
        }
    }

    function moveRight() {
        for (let i = tetris.length - 1; i >= 0; i--) {
            for (let j = tetris[i].length - 1; j >= 0; j--) {
                if (tetris[i][j] < 10) {
                    if (tetris[i][j] != 0 && tetris[i][j + 1] == 0) {
                        tetris[i][j + 1] = tetris[i][j];
                        tetris[i][j] = 0;
                    }
                }
            }
        }
        draw();
    }

    function moveLeft() {
        for (let i = tetris.length - 1; i >= 0; i--) {
            for (let j = 0; j < tetris[i].length; j++) {
                if (tetris[i][j] < 10) {
                    if (tetris[i][j] != 0 && tetris[i][j - 1] == 0) {
                        tetris[i][j - 1] = tetris[i][j];
                        tetris[i][j] = 0;
                    }
                }
            }
        }
        draw();
    }
}