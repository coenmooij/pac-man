import { CANVAS } from './constants/canvas.js';
import { CELL } from './constants/cell.js';
import { COLOR } from './constants/color.js';
import { DIRECTION } from './constants/direction.js';
import { START_LOCATION } from './constants/start-location.js';

export default class PacMan {

    constructor(context) {
        this.context = context;
        this.x = START_LOCATION.X;
        this.y = START_LOCATION.Y;
        this.direction = DIRECTION.RIGHT;
        this.modifier = 1;
    }

    // TODO : Move to painter
    reset() {
        this.context.fillStyle = COLOR.BACKGROUND;
        this.context.fillRect(this.x - CELL.WIDTH / 2, this.y - CELL.HEIGHT / 2, CELL.WIDTH, CELL.HEIGHT);
    }

    // TODO : Move to painter
    paint() {
        const [startAngle, endAngle] = this.getAngles();
        this.context.fillStyle = COLOR.PACMAN;
        this.context.beginPath();
        this.context.arc(
            this.x + .5, // .5 correction for canvas stroke issues.
            this.y + .5, // .5 correction for canvas stroke issues.
            CELL.WIDTH / 2 - 1, // -1 correction for canvas stroke issues.
            startAngle * Math.PI,
            endAngle * Math.PI);
        this.context.lineTo(this.x, this.y);
        this.context.closePath();
        this.context.fill();
    }

    bite() {
        this.modifier += 0.03;
        if (this.modifier > 1) {
            this.modifier = 0.01;
        }
    }

    getAngles() {
        const angle = 0.3 * this.modifier;
        switch (this.direction) {
            case DIRECTION.RIGHT:
                return [angle, 2 - angle];
            case DIRECTION.LEFT:
                return [1 + angle, 1 - angle];
            case DIRECTION.DOWN:
                return [0.5 + angle, 0.5 - angle];
            case DIRECTION.UP:
                return [1.5 + angle, 1.5 - angle];
        }
    }
}
