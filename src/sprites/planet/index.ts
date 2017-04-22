import * as Phaser from 'phaser-ce';
import CFG from '../../cfg';

export default class Planet extends Phaser.Sprite {

    constructor({state, x, y}) {
        super(state.game, x, y, 'planet');
        this.game.physics.p2.enable(this);
        this.body.setCircle(CFG.PLANET.SIZE);

        this.body.setCollisionGroup(state.collisionObjects);
        this.body.collides(state.collisionObjects);

        this.body.static = true;
    }

    update() {
        // this.game.debug.body(this);
    }
}