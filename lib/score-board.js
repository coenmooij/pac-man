import { CONSUMED_FOOD } from './constants/consumed-food.js';
import { POINTS } from './constants/points.js';

export default class ScoreBoard {

    constructor() {
        this.score = 0;
        this.pelletsConsumed = 0;
        this.powerPelletsConsumed = 0;
    }

    processConsumedFood(consumedFood) {
        switch (consumedFood) {
            case CONSUMED_FOOD.PELLET:
                this.processPellet();
                break;
            case CONSUMED_FOOD.POWER_PELLET:
                this.processPowerPellet();
                break;
            case CONSUMED_FOOD.EMPTY:
            default:
                // Do nothing
                break;
        }
    }

    processPellet() {
        this.pelletsConsumed++;
        this.score += POINTS.PELLET;
    }

    processPowerPellet() {
        this.powerPelletsConsumed++;
        this.score += POINTS.POWER_PELLET;
    }

    getScore() {
        return this.score;
    }

    // TODO : implement
    eatGhost() {
    }

    // TODO : Implement
    eatFruit() {
    }
}
