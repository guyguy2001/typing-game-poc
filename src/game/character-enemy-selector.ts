import InputConsumer from "../infrastructure/input-consumer";
import State from "./state";

const DEFAULT_SELECTOR_KEY = ' ';

export default class CharacterEnemySelector implements InputConsumer {
    isSelecting = false;

    constructor(private state: State) { }

    onInput(key: string) {
        if (this.isSelecting) {
            if (key in this.state.enemyManager.enemiesBySelector){
                this.state.selectedEnemy?.onDeselcted();
                this.state.selectedEnemy = this.state.enemyManager.enemiesBySelector[key];
                this.state.selectedEnemy.onSelected();
            }
            this.isSelecting = false;
            return true;
        } else {
            if (key === DEFAULT_SELECTOR_KEY){
                this.isSelecting = true;
                return true;
            }
        }
        return false;
    }
}