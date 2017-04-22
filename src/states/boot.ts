import * as Phaser from 'phaser-ce';

export class BootState extends Phaser.State {
  stage: Phaser.Stage

  init () {
    this.stage.backgroundColor = '#EDEEC9'
  }

  preload () {
  }

  render () {
    this.game.state.start('Game')
  }
}
