import { CANVAS } from './lib/canvas.js';
import Controller from './lib/controller.js';
import Grid from './lib/grid.js';
import Maze from './lib/maze.js';
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
    maze = new Maze(context);
    grid = new Grid(context);
    pacMan = new PacMan(context, CANVAS.GAP, CANVAS.GAP); // TODO : Set starting point properly
    controller = new Controller(grid, pacMan);
}

function update() {
    controller.move();
    maze.reset();
    maze.paint(); // TODO : Paint once and remove pacman previous position, check ball as well
    grid.paint(); // TODO : only enable for debug // TODO : Check speed
    pacMan.bite();
    pacMan.paint();
}
