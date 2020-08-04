import { CANVAS } from './lib/canvas.js';
import Controller from './lib/controller.js';
import Grid from './lib/grid.js';
import Maze from './lib/maze.js';
import PacMan from './lib/pac-man.js';

const SPEED = 150;

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
    setInterval(update, 1000 / SPEED);
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
    maze.paint();
    // grid.paint(); // TODO : only enable for debug
    pacMan.bite();
    pacMan.paint();
}
