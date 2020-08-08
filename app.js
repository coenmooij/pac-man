import { CONSUMED_FOOD } from './lib/constants/consumed-food.js';
import Controller from './lib/controller.js';
import MazePainter from './lib/view/maze-painter.js';
import Maze from './lib/maze.js';
import PacManPainter from './lib/view/pac-man-painter.js';
import PacMan from './lib/pac-man.js';
import ScoreBoard from './lib/score-board.js';
import ScoreBoardPainter from './lib/view/score-board-painter.js';

const FPS = 120;

let mazeContext, maze, mazePainter;
let pacMan, pacManPainter;
let scoreboardContext, scoreBoard, scoreBoardPainter;
let controller;

window.onload = function () {
    // Get the context
    let canvas = document.getElementById('maze');
    mazeContext = canvas.getContext('2d');

    canvas = document.getElementById('scoreboard');
    scoreboardContext = canvas.getContext('2d');

    // Setup the game
    initialize();

    // Listen to input
    document.addEventListener('keydown', (event) => {
        controller.onKeyDown(event);
    });

    // Start the game interval
    setInterval(update, 1000 / FPS);
}

function initialize() {
    maze = new Maze();
    mazePainter = new MazePainter(mazeContext, maze);
    mazePainter.paint();

    pacMan = new PacMan(maze);
    pacManPainter = new PacManPainter(mazeContext, pacMan);
    pacManPainter.paint();

    scoreBoard = new ScoreBoard();
    scoreBoardPainter = new ScoreBoardPainter(scoreboardContext, scoreBoard);
    scoreBoardPainter.paint();

    // TODO : Add  life tracker
    // TODO : Add ghosts and painter

    controller = new Controller(maze, pacMan);

}

function update() {
    mazePainter.repaintAreaAt(pacMan.x, pacMan.y);
    controller.move();
    const consumedFood = pacMan.bite();
    scoreBoard.processConsumedFood(consumedFood);
    scoreBoardPainter.repaint();

    // TODO : Track and remove pellets
    // TODO : Repaint ghosts and their area
    // TODO : Collect all cells to repaint and do it at once for optimization
    pacManPainter.paint();
}
