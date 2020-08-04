import { CANVAS } from './canvas.js';
import { COLOR } from './color.js';
import { DIRECTION } from './direction.js';

export default class PacMan {

    constructor(context, x, y) {
        this.context = context;
        this.x = x;
        this.y = y;
        this.direction = DIRECTION.RIGHT;
        this.modifier = 1;
    }

    paint() {
        const [startAngle, endAngle] = this.getAngles();
        this.context.fillStyle = COLOR.PACMAN;
        this.context.beginPath();
        this.context.arc(this.x, this.y, CANVAS.RADIUS - 1, startAngle * Math.PI, endAngle * Math.PI);
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
