// execute this code after DOM was loaded
window.onload = function () {
    let tetris = [];
    let tetrisField = document.querySelector('#tetris-field');
    let scoreField = document.querySelector('.scores');
    let numOfColors = 5; // max - 5
    let speed = 300; // d
    let score = 0;
    let flag;
    let timer;

    init();

    document.querySelector('.start').onclick = run;
    document.querySelector('.left').onclick = moveLeft;
    document.querySelector('.right').onclick = moveRight;
    document.querySelector('.down').onclick = moveDown;


    document.onkeydown = function (e) {
        switch (e.code) {
            case "ArrowRight":
                moveRight();
                break;
            case "ArrowLeft":
                moveLeft();
                break;
            case "ArrowUp":
                run();
                break;
        }
        return true;
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
    }


    function randomInteger(min, max) {
        let rand = min + Math.random() * (max + 1 - min);
        rand = Math.floor(rand);
        return rand;
    }


    function square() {
        tetris[0][0] = randomInteger(1, numOfColors);
    }


    function run() {
        if (document.querySelector('.right').hasAttribute('disabled')) {
            document.querySelector('.right').removeAttribute('disabled');
            document.querySelector('.left').removeAttribute('disabled');
            document.querySelector('.down').removeAttribute('disabled');
        }

         if(document.querySelector('.start')) {
             document.querySelector('.start').setAttribute('style', 'display:none');
         }

        if (finish()) {
            return false;
        }


        timer = setTimeout(function () {

            if (flag) {
                square();
            }
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
            checkLine();

            run();
        }, speed);
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

    function moveDown() {
        for (let i = tetris.length - 1; i >= 0; i--) {
            for (let j = 0; j < tetris[i].length; j++) {
                if (tetris[i][j] > 0 && tetris[i][j] < 10) {
                    //console.log('tetris-i-j:' + tetris[i][j]);
                    //console.log('tetris-i:' + tetris[i]);
                    for (let k = tetris.length - 1; k >= 0; k--) {
                        if (tetris[k][j] == 0) {
                            //console.log('tetris-k-j:' + tetris[k][j]);
                            tetris[k][j] = tetris[i][j];
                            tetris[i][j] = 0;
                            break;
                        }
                    }
                    break;
                }
            }
        }
        draw();
    }


    function checkLine() {
        for (let i = tetris.length - 1; i >= 0; i--) {
            for (let j = 0; j < tetris[i].length; j++) {
                if (tetris[i][j] > 10 && tetris[i][j + 1] != undefined && tetris[i][j + 2] != undefined) {
                    if (tetris[i][j] == tetris[i][j + 1] && tetris[i][j] == tetris[i][j + 2]) {
                        tetris[i][j] = 0;
                        tetris[i][j + 1] = 0;
                        tetris[i][j + 2] = 0;
                        score += 5;
                        for (let m = i; m >= 0; m--) {
                            if (tetris[m][j] > 10) {
                                tetris[m][j] = tetris[m][j] - 10;
                            }
                            if (tetris[m][j + 1] > 10) {
                                tetris[m][j + 1] = tetris[m][j + 1] - 10;
                            }
                            if (tetris[m][j + 2] > 10) {
                                tetris[m][j + 2] = tetris[m][j + 2] - 10;
                            }
                        }
                    }
                }
            }
        }
    }


    function finish() {
        let stop = false;
        for (let i = tetris.length - 1; i >= 0; i--) {
            for (let j = 0; j < tetris[i].length; j++) {
                stop = true;
                for (let k = 0; k < tetris.length; k++) {
                    if (tetris[k][j] == 0) {
                        stop = false;
                        break;
                    }
                }
                if (stop) {
                    clearTimeout(timer);
                    break;
                }
            }
            if (stop) {
                document.querySelector('.text-field').setAttribute('class', 'block text-field mobile-show');
                createForm();

                break;
            }
        }

        return stop;
    }

    function createForm() {
        let form = document.createElement('form');
        form.innerHTML = '<h2 class="text-center">Save your result:</h2>';
        form.setAttribute('method', 'POST');
        form.setAttribute('action', 'handler.php');
        let hiddenInput = document.createElement('input');
        hiddenInput.setAttribute('type', 'hidden');
        hiddenInput.setAttribute('name', 'scores');
        hiddenInput.setAttribute('value', score);
        let nameInput = document.createElement('input');
        nameInput.setAttribute('type', 'text');
        nameInput.setAttribute('name', 'name');
        let submitInput = document.createElement('input');
        submitInput.setAttribute('type', 'submit');
        submitInput.setAttribute('class', 'start');
        submitInput.setAttribute('value', 'Send');
        let pText = document.createElement('p');
        pText.setAttribute('style', 'color:red');
        pText.setAttribute('class', 'text-center');
        pText.innerHTML = 'to start new game press F5';
        form.appendChild(hiddenInput);
        form.appendChild(nameInput);
        form.appendChild(submitInput);
        form.appendChild(pText);
        document.querySelector('.form').innerHTML = '';
        document.querySelector('.form').appendChild(form);
    }
}