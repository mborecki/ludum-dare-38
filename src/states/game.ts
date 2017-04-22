import * as Phaser from 'phaser-ce'
import {setResponsiveWidth} from '../utils'

export class GameState extends Phaser.State {

  init () {}
  preload () {}

  create () {
    let banner = this.add.text(this.game.world.centerX, this.game.height - 30, 'Phaser + ES6 + Webpack', {})
    banner.font = 'Arial'
    banner.fontSize = 40
    banner.fill = '#77BFA3'
    banner.anchor.setTo(0.5)


  }

  render () {
    
  }
}
