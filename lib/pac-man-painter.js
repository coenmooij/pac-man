import { CELL } from './constants/cell.js';
import { COLOR } from './constants/color.js';
import { DIRECTION } from './constants/direction.js';

export default class PacManPainter {

    constructor(context, pacMan) {
        this.context = context;
        this.pacMan = pacMan;
    }

    paint() {
        const [startAngle, endAngle] = this.getBiteAngles();
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

    getBiteAngles() {
        const angle = 0.3 * this.pacMan.biteModifier;
        switch (this.pacMan.direction) {
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