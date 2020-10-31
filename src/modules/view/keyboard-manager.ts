import Enemy from './enemy';
import State from './state';

const DEFAULT_SELECTOR_KEY = ' ';
const DEFAULT_PAUSE_KEY = 'Escape';

type HandleKeyReturn =
  | {
      action: 'pause' | 'start-select';
    }
  | {
      action: 'select-enemy';
      enemy: Enemy;
    };

export default class KeyboardManager {
  constructor(public state: State) {}
  public handleKey(key: string): HandleKeyReturn {
    switch (key) {
      case DEFAULT_PAUSE_KEY:
        return { action: 'pause' };
      case DEFAULT_SELECTOR_KEY:
        return { action: 'start-select' };
    }
    if (this.state.isSelecting) {
      if (key in this.state.enemyManager.enemiesBySelector) {
        return {
          action: 'select-enemy',
          enemy: this.state.enemyManager.enemiesBySelector[key],
        };
      }
    }
    console.log(this.state);
    throw Error();
  }
}
