import * as Phaser from 'phaser-ce';

export default class GreenMan extends Phaser.Sprite {
    constructor({state, x, y}) {
        super(state.game, x, y, 'green-man');
        this.game.physics.p2.enable(this);

        this.body.setCollisionGroup(state.collisionObjects);
        this.body.collides(state.collisionObjects);

        this.anchor.set(0.5, 1);

        this.body.static = true;

        this.body.onBeginContact.add(this.collision, this);
    }

    update() {
        this.game.debug.body(this);
    }

    collision() {
        console.log('AU!');
        this.destroy();
    }

}