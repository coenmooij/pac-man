import Controller from './lib/controller.js';
import MazePainter from './lib/maze-painter.js';
import Maze from './lib/maze.js';
import PacManPainter from './lib/pac-man-painter.js';
import PacMan from './lib/pac-man.js';

const FPS = 120;

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

    pacMan = new PacMan(maze);
    pacManPainter = new PacManPainter(context, pacMan);
    pacManPainter.paint();

    // TODO : Add score and life tracker
    // TODO : Add ghosts and painter

    controller = new Controller(maze, pacMan);

}

function update() {
    controller.move();
    pacMan.bite();
    // TODO : Track and remove pellets
    // TODO : Update score
    // TODO : Repaint ghosts and their area
    // TODO : Collect all cells to repaint and do it at once for optimization
    mazePainter.repaintArea(pacMan.x, pacMan.y);
    pacManPainter.paint();
}
