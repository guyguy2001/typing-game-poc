import Attack from "new/attack";
import AttackIcon from "./attack-icon";

export default class AttackIconsDiv extends PIXI.Graphics {
    iconsAmount = 0;
    public addAbilityIcon(attack: Attack) {
        const icon = new AttackIcon(attack.key);
        icon.position.set(icon.width * 1.25 * this.iconsAmount + 200, 0)
        this.addChild(icon);

        console.log(icon.getGlobalPosition());
        console.log(icon.position, icon.width);
        icon.redraw();

        this.iconsAmount++;
    }
}