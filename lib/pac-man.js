import { DIRECTION } from './constants/direction.js';
import { START_LOCATION } from './constants/start-location.js';

export default class PacMan {

    constructor() {
        this.x = START_LOCATION.X;
        this.y = START_LOCATION.Y;
        this.direction = DIRECTION.RIGHT;
        this.biteModifier = 1;
    }

    bite() {
        this.biteModifier += 0.03;
        if (this.biteModifier > 1) {
            this.biteModifier = 0.01;
        }
    }
}
