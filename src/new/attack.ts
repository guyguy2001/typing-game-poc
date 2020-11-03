import Enemy from './objects/enemy'

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