import { DIRECTION } from './lib/direction.js';
import Grid from './lib/grid.js';
import Maze from './lib/maze.js';
import PacMan, { RADIUS } from './lib/pac-man.js';

const SPEED = 150;
const SIZE = 600;

let context;
let pacMan;
let grid;
let maze;

window.onload = function () {
    const canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');
    document.addEventListener('keydown', onKeydown);
    initialize();
    setInterval(update, 1000 / SPEED);
}

function onKeydown(event) {
    let direction;
    switch (event.keyCode) {
        case 37:
            direction = DIRECTION.LEFT;
            break;
        case 38:
            direction = DIRECTION.UP;
            break;
        case 39:
            direction = DIRECTION.RIGHT;
            break;
        case 40:
            direction = DIRECTION.DOWN;
            break;
    }
    pacMan.setDirection(direction);
}

function initialize() {
    maze = new Maze(context);
    grid = new Grid();
    pacMan = new PacMan(context, SIZE / 2, SIZE / 2, DIRECTION.RIGHT);
}

function update() {
    movePacman();
    maze.reset();
    maze.paint();
    pacMan.paint();
}


function movePacman() {
    // TODO : Implement before / after checking for new location
    // TODO : Implement up & down
    switch (pacMan.direction) {
        case DIRECTION.RIGHT:
            if (!grid.isValidPosition(pacMan.x + 1, pacMan.y)) {
                break;
            }
            pacMan.x += 1;
            break;
        case DIRECTION.LEFT:
            if (!grid.isValidPosition(pacMan.x - 1, pacMan.y)) {
                break;
            }
            pacMan.x -= 1;
            if (pacMan.x < RADIUS / 2) {
            }
            break;
    }
}

