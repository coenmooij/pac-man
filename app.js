import Controller from './lib/controller.js';
import MazePainter from './lib/maze-painter.js';
import Maze from './lib/maze.js';
import PacManPainter from './lib/pac-man-painter.js';
import PacMan from './lib/pac-man.js';

const FPS = 24;

let context;
let pacMan;
let maze;
let controller;
let mazePainter;
let pacManPainter;

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
    setInterval(update, 1000 / FPS);
}

function initialize() {
    maze = new Maze();
    mazePainter = new MazePainter(context, maze);
    mazePainter.paint();

    pacMan = new PacMan();
    pacManPainter = new PacManPainter(context, pacMan);
    pacManPainter.paint();

    controller = new Controller(maze, pacMan);

}

function update() {
    controller.move();
    pacMan.bite();

    // For performance we only repaint the part of the board that will change
    // TODO : Add ghost locations to repaint
    mazePainter.repaint();
    pacManPainter.paint();
}
