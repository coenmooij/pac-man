import { COLOR } from '../constants/color.js';
import { SCORE_BOARD } from '../constants/score-board.js';

export default class ScoreBoardPainter {

    constructor(context, scoreBoard) {
        this.context = context;
        this.scoreBoard = scoreBoard;
    }

    repaint() {
        this.context.fillStyle = COLOR.BACKGROUND;
        this.context.fillRect(0, 0, SCORE_BOARD.WIDTH, SCORE_BOARD.HEIGHT);
        this.paint();
    }

    paint() {
        this.context.fillStyle = COLOR.TEXT;
        this.context.font = '25px press-start-regular';
        this.context.textAlign = 'center';
        this.context.fillText('SCORE:', SCORE_BOARD.WIDTH / 2, 38);
        this.context.fillText(this.scoreBoard.getScore(), SCORE_BOARD.WIDTH / 2, 74);
    }
}
