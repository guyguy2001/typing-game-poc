import InputConsumer from "./input-consumer";
import State from "./state";

const DEFAULT_SELECTOR_KEY = ' ';

export default class EnemySelector implements InputConsumer {
    constructor(private state: State) { }

    onInput(key: string) {
        if (this.state.isSelecting) {
            if (key in this.state.enemyManager.enemiesBySelector){
                this.state.selectedEnemy?.onDeselcted();
                this.state.selectedEnemy = this.state.enemyManager.enemiesBySelector[key];
                this.state.selectedEnemy.onSelected();
            }
            this.state.isSelecting = false;
            return true;
        } else {
            if (key === DEFAULT_SELECTOR_KEY){
                this.state.isSelecting = true;
                return true;
            }
        }
        return false;
    }
}