import GameState from './states/game';
import GreenMan from './sprites/enemies/green-man';

export default class EnemyManager {
    gameState :GameState;
    energy: number = 0;
    working: boolean = false;
    energyIncrease: number = 10;

    constructor(state: GameState) {
        this.gameState = state;
    }

    start() {
        this.working = true;
    }

    tick(v) {
        this.energy += this.energyIncrease * v;
        this.gameState.game.debug.text(`Enemy Energy: ${this.energy.toFixed(2)}`, 32, 64);
        this.makeDecition();
    }

    makeDecition() {
        let rand = Math.random();

        if (this.gameState.points < 100) {
            if (rand > 0.95 && this.energy > GreenMan.COST * 1.2) {
                this.spawnGreenMan();
                return;
            }
        }

        if (this.gameState.points < 1000) {
            if (rand > 0.95 && this.energy > GreenMan.COST * 1.5) {
                this.spawnGreenMan();
                this.spawnGreenMan();
                this.spawnGreenMan();
                return;
            }
        }

    }

    spawnGreenMan() {
        let base = this.gameState.base.pntRot;
        console.log('base:', base);
        this.gameState.spawnGreenMan(base + Math.PI + Math.random() - 0.5);
        this.energy -= GreenMan.COST;
    }

    spawnGreenManTeam() {
        let base = this.gameState.base.pntRot;
        console.log('base:', base);
        this.gameState.spawnGreenMan(base + Math.PI + Math.random() - 0.5);
        this.energy -= GreenMan.COST * 0.5;
    }
}