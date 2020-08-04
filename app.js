import Controller from './lib/controller.js';
import Grid from './lib/grid.js';
import Maze from './lib/maze.js';
import PacMan from './lib/pac-man.js';

const SPEED = 150;
const SIZE = 600;

let context;
let pacMan;
let grid;
let maze;
let controller;

window.onload = function () {
    // Get the context
    const canvas = document.getElementById('canvas');
    context = canvas.getContext('2d');

    // Setup the game
    initialize();

    // Listen to inputs and start the game
    document.addEventListener('keydown', (event) => {
        controller.onKeydown(event);
    });
    setInterval(update, 1000 / SPEED);
}

function initialize() {
    maze = new Maze(context);
    grid = new Grid();
    pacMan = new PacMan(context, SIZE / 2, SIZE / 2);
    controller = new Controller(grid, pacMan);
}

function update() {
    controller.move();
    maze.reset();
    maze.paint();
    pacMan.paint();
}
