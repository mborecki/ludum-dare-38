import * as Phaser from 'phaser-ce';

export class BootState extends Phaser.State {
  stage: Phaser.Stage

  init () {
    this.stage.backgroundColor = '#EDEEC9'
  }

  preload () {
    this.load.spritesheet('planet', './assets/images/planet.png', 500, 500);
    this.load.spritesheet('base', './assets/images/base.png', 50, 25);
    this.load.spritesheet('cannon', './assets/images/cannon.png', 50, 10);
    this.load.spritesheet('cannon-ball', './assets/images/cannon-ball.png', 8, 8);
    this.load.spritesheet('bg', './assets/images/bg.png', 700, 700);
  }

  render () {
    this.game.state.start('Game')
  }
}
