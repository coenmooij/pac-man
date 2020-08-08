import { CELL } from './constants/cell.js';
import { DIRECTION } from './constants/direction.js';
import { START_LOCATION } from './constants/start-location.js';

export default class PacMan {

    constructor(maze) {
        this.maze = maze;
        this.x = START_LOCATION.X;
        this.y = START_LOCATION.Y;
        this.direction = DIRECTION.RIGHT;
        this.biteModifier = 0;
        this.score = 0;
    }

    bite() {
        this.updateBiteModifier();
        this.eatPelletIfPossible();
    }

    updateBiteModifier() {
        this.biteModifier += 0.03;
        if (this.biteModifier > 1) {
            this.biteModifier = 0.01;
        }
    }

    eatPelletIfPossible() {
        const cell = this.maze.getCellAt(this.x, this.y);
        if (cell === CELL.PELLET || cell === CELL.POWER_PELLET) {
            this.maze.emptyCellAt(this.x, this.y);
            this.score++;
        }
        if (cell === CELL.POWER_PELLET) {
            this.startFear();
        }
    }

    startFear() {
        // TODO : Implement
    }
}
