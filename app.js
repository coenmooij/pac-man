import { CANVAS } from './lib/constants/canvas.js';
import Controller from './lib/controller.js';
import Grid from './lib/grid.js';
import PacMan from './lib/pac-man.js';

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
        controller.onKeyDown(event);
    });
    setInterval(update, 5);
}

function initialize() {
    grid = new Grid(context);
    pacMan = new PacMan(context);
    controller = new Controller(grid, pacMan);
}

function update() {
    pacMan.reset();
    controller.move();
    pacMan.bite();
    pacMan.paint();
}
