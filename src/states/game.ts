import * as Phaser from 'phaser-ce';
import {setResponsiveWidth, PntToWorld, WorldToPnt, rotDist} from '../utils';
import Planet from '../sprites/planet/index';
import Base from '../sprites/base/index';
import CFG from '../cfg';
import GreenMan from '../sprites/enemies/green-man';
import EnemyManager from '../enemy-manager';

import CannonBall from '../sprites/weapons/cannon-ball';

export default class GameState extends Phaser.State {
  planet: Planet;
  base: Base;
  bg: Phaser.Sprite;
  points: number = 0;

  playerBuildings: Phaser.Group;

  weapons: Phaser.Group;
  enemies: Phaser.Group;

  collisionObjects: any;

  weaponMode: string = 'single';

  enemyManager: EnemyManager = new EnemyManager(this);

  init () {
    this.game.physics.startSystem(Phaser.Physics.P2JS);
    this.physics.p2.setImpactEvents(true);
    this.collisionObjects = this.game.physics.p2.createCollisionGroup();
  }
  preload () {}

  create () {

    // this.world.setBounds(0, 0, 10000, 10000);
    this.world.camera.setPosition(0,0);

    this.createBG();

    this.playerBuildings = this.game.add.group();
    this.createPlanet();

    this.createBase();

    this.weapons = this.game.add.group();
    this.weapons.enableBody = true;

    this.enemies = this.game.add.group();
    this.enemies.enableBody = true;


    this.initInput();

    this.spawnGreenMans();

    this.enemyManager.start();
  }

  render () {

  }

  update () {
    this.game.debug.text(`Points: ${this.points}`, 32, 32);
    this.enemyManager.tick(this.game.time.physicsElapsed);
  }

  createBG() {
   this.bg = this.game.add.sprite(0,0,'bg'); 
   this.bg.height = this.game.height;
   this.bg.width = this.game.width;
  }

  createPlanet() {
    this.planet = new Planet({
      state: this,
      x: CFG.PLANET.X,
      y: CFG.PLANET.Y
    });
    this.game.add.existing(this.planet);
  }

  createBase() {

    this.base = new Base({
      game: this.game,
      // pntRot: Math.random() * 4 - 2
      pntRot: -Math.PI * 0.5
      // pntRot: 0
    });

    this.playerBuildings.add(this.base);
  }

  spawnObject(object: Phaser.Sprite, rotation: number, radius: number = CFG.PLANET.SIZE, rotate: boolean = true) {
    let {x,y,rot} = PntToWorld(rotation, radius);

    object.x = x + CFG.PLANET.X;
    object.y = y + CFG.PLANET.Y;
    object.rotation = rot;

    this.add.existing(object);
  }

  initInput() {
    this.bg.inputEnabled = true;
    this.bg.events.onInputUp.add(() => {
      if (this.weaponMode === 'single') {
        this.shoot();
      }
    });
  }

  shoot() {
    let rot = this.base.getCannonRot();
    let [x ,y] = this.base.getBulletOrigin();

    let w = this.weapons.add(new CannonBall({
      state: this,
      x,
      y,
      angle: rot
    }));
  }

  spawnGreenMans() {
    let c = 8;
    for (let i = 1; i < c; i++) {
      this.spawnGreenMan((Phaser.Math.PI2 * i / c) + (this.base.pntRot % Phaser.Math.PI2))
    }
  }

  spawnGreenMan(pntRot) {
    console.log('spawnGreenMan', pntRot);
    let enemy = this.enemies.add(new GreenMan({
        state: this,
        pntRot: pntRot
    }));

    enemy.killed.add(({
      value
    }) => {
      this.points += value;
    })
  }

  findClosestPlayerRot(source) {
    let best = null;
    let bestDist = null;

    this.playerBuildings.forEach(b => {
      let rot = b.pntRot % Phaser.Math.PI2;
      let dist = rotDist(source, rot);
      if (!best) {
        best = rot;
        bestDist = dist;
        return;
      }

      if (dist < bestDist) {
        best = rot;
        bestDist = dist;
      }
    }, this, true);

    // console.log('dist', bestDist);

    return best;
  }
}
