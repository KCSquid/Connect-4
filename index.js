var board;
var gameOver = false;
var turn = 'red';

const x = [75, 200, 325, 450, 575, 700, 825];
const y = [75, 200, 325, 450, 575, 700];

var boardSpaces = [
    ['n', 'n', 'n', 'n', 'n', 'n', 'n'],
    ['n', 'n', 'n', 'n', 'n', 'n', 'n'],
    ['n', 'n', 'n', 'n', 'n', 'n', 'n'],
    ['n', 'n', 'n', 'n', 'n', 'n', 'n'],
    ['n', 'n', 'n', 'n', 'n', 'n', 'n'],
    ['n', 'n', 'n', 'n', 'n', 'n', 'n']
]

function startGame() {
    gameCanvas.start();
    board = new createBoard();
}

function checkBoard(color) {
    // Horizontal
    for (let i = boardSpaces.length - 1; i > -1; i--) {
        for (let n = 0; n < boardSpaces[i].length; n++) {
            if (boardSpaces[i][n] == color) {
                if (n+1 != boardSpaces.length && boardSpaces[i][n+1] == color) {
                    if (n+1 != boardSpaces.length && boardSpaces[i][n+2] == color) {
                        if (n+1 != boardSpaces.length && boardSpaces[i][n+3] == color) {
                            console.log(`${color} wins!`);
                            return true;
                        }
                    }
                }
            }
        }
    }

    // Vertical
    for (let i = boardSpaces.length - 1; i > -1; i--) {
        for (let n = 0; n < boardSpaces[i].length; n++) {
            if (boardSpaces[i][n] == color) {
                if (i-1 >= 0 && boardSpaces[i-1][n] == color) {1
                    if (i-2 >= 0 && boardSpaces[i-2][n] == color) {
                        if (i-3 >= 0 && boardSpaces[i-3][n] == color) {
                            console.log(`${color} wins!`);
                            return true;
                        }
                    }
                }
            }
        }
    }

    // Right Diagonal
    for (let i = boardSpaces.length - 1; i > -1; i--) {
        for (let n = 0; n < boardSpaces[i].length; n++) {
            if (boardSpaces[i][n] == color) {
                if (i-1 >= 0 && n+1 != boardSpaces.length && boardSpaces[i-1][n+1] == color) {
                    if (i-2 >= 0 && n+2 != boardSpaces.length && boardSpaces[i-2][n+2] == color) {
                        if (i-3 >= 0 && n+3 != boardSpaces.length && boardSpaces[i-3][n+3] == color) {
                            console.log(`${color} wins!`);
                            return true;
                        }
                    }
                }
            }
        }
    }

    // Left Diagonal
    for (let i = boardSpaces.length - 1; i > -1; i--) {
        for (let n = 0; n < boardSpaces[i].length; n++) {
            if (boardSpaces[i][n] == color) {
                if (i-1 >= 0 && n-1 != boardSpaces.length && boardSpaces[i-1][n-1] == color) {
                    if (i-2 >= 0 && n-2 != boardSpaces.length && boardSpaces[i-2][n-2] == color) {
                        if (i-3 >= 0 && n-3 != boardSpaces.length && boardSpaces[i-3][n-3] == color) {
                            console.log(`${color} wins!`);
                            return true;
                        }
                    }
                }
            }
        }
    }

    return false;
}

function placeCircle(r) {
    if (gameOver) {
        return;
    }

    r = r - 1;

    for (let i = boardSpaces.length - 1; i > -1; i--) {
        if (boardSpaces[i][r] == 'n') {
            boardSpaces[i][r] = turn;
            createCircle(gameCanvas.ctx, x[r], y[i], turn);
            if (turn == 'red') {
                turn = 'yellow'
            } else {
                turn = 'red';
            }

            if (checkBoard('red')) {
                gameOver = true;
                $('#game-over').text("Red Wins!");
            } else if (checkBoard('yellow')) {
                gameOver = true;
                $('#game-over').text("Yellow Wins!");
            }

            break;
        }
    }
}

function createCircle(ctx, x, y, color = '#212f3d') {
    ctx.beginPath();
    ctx.arc(x, y, 50, 0, 2 * 3.14159265358979323, false)
    ctx.fillStyle = color;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 5
    ctx.fill();
    ctx.stroke();
}

function createBoard(size) {
    this.size = size;
    ctx = gameCanvas.ctx;

    for (let i = 0; i < x.length; i++) {
        for (let n = 0; n < y.length; n++) {
            createCircle(ctx, x[i], y[n]);
        }
    }
}

var gameCanvas = {
    canvas: document.createElement("canvas"),
    start: function() {
        this.canvas.width = 900;
        this.canvas.height = 775;
        this.ctx = this.canvas.getContext("2d");
        document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    }
}