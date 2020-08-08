import Controller from './controller.js';
import Maze from './maze.js';
import PacMan from './pac-man.js';
import ScoreBoard from './score-board.js';
import MazePainter from './view/maze-painter.js';
import PacManPainter from './view/pac-man-painter.js';
import ScoreBoardPainter from './view/score-board-painter.js';

export default class Game {
    constructor(mazeContext, scoreBoardContext) {
        this.mazeContext = mazeContext;
        this.scoreBoardContext = scoreBoardContext;
    }

    // TODO : Add  life tracker
    // TODO : Add ghosts and painter
    initialize() {
        this.maze = new Maze();
        this.mazePainter = new MazePainter(this.mazeContext, this.maze);
        this.mazePainter.paint();

        this.pacMan = new PacMan(this.maze);
        this.pacManPainter = new PacManPainter(this.mazeContext, this.pacMan);
        this.pacManPainter.paint();

        this.scoreBoard = new ScoreBoard();
        this.scoreBoardPainter = new ScoreBoardPainter(this.scoreBoardContext, this.scoreBoard);
        this.scoreBoardPainter.paint();

        this.controller = new Controller(this.maze, this.pacMan);
        this.gameRunning = false;
    }

    // TODO : Repaint ghosts and their area
    // TODO : Collect all cells to repaint and do it at once for optimization
    update() {
        if (!this.gameRunning) {
            this.scoreBoardPainter.repaint(); // Because the font is loading slowly
            return;
        }
        this.mazePainter.repaintAreaAt(this.pacMan.x, this.pacMan.y);

        this.controller.move();
        const consumedFood = this.pacMan.bite();
        this.scoreBoard.processConsumedFood(consumedFood);
        if (this.scoreBoard.allFoodConsumed()) {
            this.maze.initialize();
            this.pacMan = new PacMan(this.maze);
            this.mazePainter.paint();
            this.scoreBoard.resetFoodConsumed();
        }
        this.scoreBoardPainter.repaint();
        this.pacManPainter.paint();
    }

    // TODO : Handle continuing the game, resetting the board
    onKeyDown(event) {
        const directionSet = this.controller.onKeyDown(event);
        if (!this.gameRunning && directionSet) {
            this.gameRunning = true;
        }

    }
}
