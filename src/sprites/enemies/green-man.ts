import * as Phaser from 'phaser-ce';
import CFG from '../../cfg';
import {WorldToPnt, PntToWorld, rotDist} from '../../utils';

export default class GreenMan extends Phaser.Sprite {
    private _pntRot: number;
    private moveVector: number = 1;
    state: Phaser.Stage;

    constructor({state, pntRot}) {
        super(state.game, 0, 0, 'green-man');
        this.state = state;

        // console.log('GreenMan', pntRot);

        this.game.physics.p2.enable(this);
        this.anchor.set(0.5, 1);

        this.pntRot = pntRot;
        this.worldRender();


        this.body.setCollisionGroup(state.collisionObjects);
        this.body.collides(state.collisionObjects);


        this.body.static = true;

        this.body.onBeginContact.add(this.collision, this);

        this.setMove();
    }

    setMove() {
        let target = this.state.findClosestPlayerRot(this.pntRot);


        let a = Math.abs(target - this.pntRot)
        let b = Phaser.Math.PI2 - Math.abs(target - this.pntRot);

        if (a > b) {
            this.moveVector = 1;
        } else {
            this.moveVector = -1;
        }

        if (target > this.pntRot) {
            this.moveVector = this.moveVector * -1;
        }

        if (target > Math.PI) {
            this.moveVector = this.moveVector * -1;
        }
    }

    get pntRot() {
        return this._pntRot;
    }

    set pntRot(v) {
        this._pntRot = (v % Phaser.Math.PI2);
    }

    worldRender(pntRot = this.pntRot) {
        let {x, y, rot} = PntToWorld(pntRot);
        this.body.x = x;
        this.body.y = y;
        if (rot) {
            this.body.rotation = rot;
        }
    }

    update() {
        this.move(this.moveVector * this.game.time.physicsElapsed);
    }

    collision() {
        console.log('AU!');
        this.destroy();
    }

    move(step) {
        this.pntRot += step * CFG.ENEMIES.GREEN_MAN.SPEED;
        this.worldRender();
    }

}