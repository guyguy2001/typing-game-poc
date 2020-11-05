import Enemy from './objects/enemy'
import StatusEffect from './status-effect';

export default class Attack {
    constructor(public key: string) {}
    private damage: number = 10;

    public attack(enemy: Enemy) {
        console.log(`Attacked ${enemy.selector}`)
        enemy.damage(this.damage);
    }
}

export class Frostbolt extends Attack {

}

export class Curse extends Attack {
    public attack(enemy: Enemy) {
        new CurseStatusEffect(enemy);        
    }
}

class CurseStatusEffect extends StatusEffect {
    constructor(enemy: Enemy) {
        super(enemy);
        let ticks = 0;
        const interval = setInterval(() => {
            if (ticks < 3) {
                enemy.damage(5);
            }
            ticks++;
            
        }, 1000);
    }    
}