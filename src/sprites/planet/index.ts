import * as Phaser from 'phaser-ce';
import CFG from '../../cfg';

export default class Planet extends Phaser.Sprite {

    constructor({game, x, y}) {
        super(game, x, y, 'planet');
        this.anchor.set(0.5, 0.5);

        this.game.physics.enable(this);
        this.body.setCircle(CFG.PLANET.SIZE);
    }

    update() {
        // this.game.debug.body(this);
    }
}