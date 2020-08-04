const SPEED = 150;
const SIZE = 600;
const PACMAN_SIZE = 16;
const DIRECTION_RIGHT = 'right';
const DIRECTION_LEFT = 'left';
const DIRECTION_UP = 'up';
const DIRECTION_DOWN = 'down';
const COLOR_BACKGROUND = '#232323';
const COLOR_PACMAN = 'yellow';
const COLOR_WALL = 'blue';
const COLOR_HITBOX = 'red';

var canvas;
var context;

let pacmanLocation = {x: SIZE / 2, y: SIZE / 2};

let direction = DIRECTION_RIGHT;
let grid = [];


window.onload = function () {
    canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    document.addEventListener('keydown', onKeydown);
    setupGrid();
    startGame();
}

function setupGrid() {
    addHorizontalPath(300, 85, 500);
}

function addHorizontalPath(height, start, end) {
    for (let x = start; x <= end; x++) {
        if (grid[height] === undefined) {
            grid[height] = [];
        }
        grid[height][x] = true;
    }
}

function isValidPosition(x, y) {
    return grid[y] !== undefined && grid[y][x] === true;
}

function onKeydown(event) {
    switch (event.keyCode) {
        case 37:
            direction = DIRECTION_LEFT;
            break;
        case 38:
            direction = DIRECTION_UP;
            break;
        case 39:
            direction = DIRECTION_RIGHT;
            break;
        case 40:
            direction = DIRECTION_DOWN;
            break;
    }
}

function startGame() {
    setInterval('update()', 1000 / SPEED);
}

function update() {
    resetMaze();
    drawMaze();
    drawPacman();
    movePacman();
}

function resetMaze() {
    context.fillStyle = COLOR_BACKGROUND;
    context.fillRect(0, 0, SIZE, SIZE);
}

function movePacman() {
    switch (direction) {
        case DIRECTION_RIGHT:
            if (!isValidPosition(pacmanLocation.x + 1, pacmanLocation.y)) {
                break;
            }
            pacmanLocation.x += 1;
            if (pacmanLocation.x > SIZE - PACMAN_SIZE / 2) {
                pacmanLocation.x = PACMAN_SIZE / 2;
            }
            break;
        case DIRECTION_LEFT:
            if (!isValidPosition(pacmanLocation.x - 1, pacmanLocation.y)) {
                break;
            }
            pacmanLocation.x -= 1;
            if (pacmanLocation.x < PACMAN_SIZE / 2) {
                pacmanLocation.x = SIZE - PACMAN_SIZE / 2;
            }
            break;
    }
}

function drawPacman() {
    context.fillStyle = COLOR_PACMAN;
    context.beginPath();
    context.arc(pacmanLocation.x, pacmanLocation.y, PACMAN_SIZE, 0.2 * Math.PI, 1.8 * Math.PI);
    context.lineTo(pacmanLocation.x, pacmanLocation.y);
    context.closePath();
    context.fill();

    context.beginPath();
    context.arc(pacmanLocation.x, pacmanLocation.y - 8, 2, 0, 2 * Math.PI);
    context.fillStyle = COLOR_BACKGROUND;
    context.fill();
    context.closePath();

    // TEMPORARY HITBOX
    context.strokeStyle = COLOR_HITBOX;
    context.strokeRect(pacmanLocation.x - PACMAN_SIZE, pacmanLocation.y - PACMAN_SIZE, PACMAN_SIZE * 2, PACMAN_SIZE * 2);
}

function drawMaze() {
    context.fillStyle = COLOR_WALL;
    var rectangles = [
        [40, 20, 30, 400]
    ];
    for (let rectangle of rectangles) {
        context.fillRect(rectangle[0], rectangle[1], rectangle[2], rectangle[3]);
    }
}
