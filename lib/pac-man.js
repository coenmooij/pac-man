import { CELL } from './constants/cell.js';
import { CONSUMED_FOOD } from './constants/consumed-food.js';
import { DIRECTION } from './constants/direction.js';
import { START_LOCATION } from './constants/start-location.js';

const BITE_INCREMENT = 0.04;

export default class PacMan {

    constructor(maze) {
        this.maze = maze;
        this.reset();
    }

    bite() {
        this.updateMouthPosition();
        return this.eat();
    }

    updateMouthPosition() {
        this.mouthPosition += this.isOpening ? BITE_INCREMENT : -BITE_INCREMENT;
        if (this.mouthPosition > 1 || this.mouthPosition < BITE_INCREMENT) {
            this.isOpening = !this.isOpening;
            this.mouthPosition += this.isOpening ? BITE_INCREMENT : -BITE_INCREMENT;
        }
    }

    eat() {
        const cell = this.maze.getCellAt(this.x, this.y);
        switch (cell) {
            case CELL.PELLET:
                this.maze.emptyCellAt(this.x, this.y);
                return CONSUMED_FOOD.PELLET;
            case CELL.POWER_PELLET:
                this.maze.emptyCellAt(this.x, this.y);
                return CONSUMED_FOOD.POWER_PELLET;
            default:
                return CONSUMED_FOOD.EMPTY;
        }
    }

    reset() {
        this.mouthPosition = 0;
        this.isOpening = true;
        this.x = START_LOCATION.X;
        this.y = START_LOCATION.Y;
        this.direction = DIRECTION.RIGHT;
    }
}
