import * as Phaser from 'phaser-ce';
import Cannon from './cannon';

export default class Base extends Phaser.Sprite {
    cannon: Cannon;

    constructor({game, x, y}) {
        super(game, x, y, 'base');
        this.anchor.set(0.5, 0.5);

        this.createCannon();
    }

    createCannon() {
        this.cannon = new Cannon({
            game: this.game,
            x: 0,
            y: 0
        });

        this.addChild(this.cannon);
    }

    update() {
        let {x, y} = this.game.input.mousePointer.position;

        this.targetPosition(x - this.x, y - this.y);
    }

    targetPosition(x, y) {
        console.log('targetPosition', x, y, Math.acos(x));

        this.cannon.rotation = Phaser.Math.angleBetween(x,y,0,1) - this.rotation;
    }
}