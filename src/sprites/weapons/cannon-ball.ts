import * as Phaser from 'phaser-ce';
import CFG from '../../cfg';

export default class CannonBall extends Phaser.Sprite {
    constructor({game, x, y, angle}) {
        super(game, x, y, 'cannon-ball');
        this.anchor.set(0.5, 0.5);
        this.game.physics.enable(this);
        this.body.setCircle(CFG.WEAPONS.CANNON_BALL.SIZE);

        this.body.velocity = {
            x: -CFG.WEAPONS.CANNON_BALL.SPEED * Math.cos(angle),
            y: -CFG.WEAPONS.CANNON_BALL.SPEED * Math.sin(angle)
        }

        this.events.onOutOfBounds.add(this.destroy, this);
        this.body.onOverlap = new Phaser.Signal();
        this.body.onOverlap.add(this.collision, this);
    }

    update() {
        let distToPlanet = Phaser.Math.distance(this.x, 
                                                this.y, 
                                                CFG.PLANET.X,
                                                CFG.PLANET.Y);
        if (distToPlanet < CFG.PLANET.GRAVITY.LIMIT) {
            let force = CFG.PLANET.GRAVITY.FORCE * distToPlanet / CFG.PLANET.GRAVITY.LIMIT;
            let angle = Phaser.Math.angleBetween(this.x, 
                                                 this.y, 
                                                 CFG.PLANET.X,
                                                 CFG.PLANET.Y);

            this.body.velocity.x += force * Math.cos(angle);
            this.body.velocity.y += force * Math.sin(angle);
        }

        if (distToPlanet > CFG.MAX_DISTANCE) {
            this.destroy();
        }
    }

    collision() {
        console.log('COLLIDE!')
        this.destroy();
    }
}   