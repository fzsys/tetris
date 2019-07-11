// execute this code after DOM was loaded
window.onload = function () {
    let tetris = [];
    let tetrisField = document.querySelector('#tetris-field');
    let scoreField = document.querySelector('.scores');
    let numOfColors = 5;
    let score = 0;

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
                } else if (tetris[i][j] == 1) {
                    out += '<div class="tetris-item red"></div>';
                } else if (tetris[i][j] == 2) {
                    out += '<div class="tetris-item green"></div>';
                } else if (tetris[i][j] == 3) {
                    out += '<div class="tetris-item yellow"></div>';
                } else if (tetris[i][j] == 4) {
                    out += '<div class="tetris-item blue"></div>';
                } else {
                    out += '<div class="tetris-item orange"></div>';
                }
            }
        }
        tetrisField.innerHTML = out;
        scoreField.innerHTML = score;
    }

    function square() {
        function randomInteger(min, max) {
            var rand = min + Math.random() * (max + 1 - min);
            rand = Math.floor(rand);
            return rand;
        }

        tetris[0][0] = randomInteger(1, numOfColors);
    }

    init();
    draw();
    square();
    draw();

}
