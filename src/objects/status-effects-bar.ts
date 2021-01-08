import StatusEffect from 'new/status-effects';
import StatusEffectManager from 'new/status-effects-manager';
import StatusEffectIcon from './status-effect-icon';

export default class StatusEffectsBar extends PIXI.Graphics {
  icons: StatusEffectIcon[] = [];
  constructor(private statusEffectsManager: StatusEffectManager) {
    super();
    this.statusEffectsManager.emitter.on('onEffectStarted', effect =>
      this.addStatusIcon(effect)
    );
    this.statusEffectsManager.emitter.on('onEffectEnded', effect =>
      this.onEffectEnded(effect)
    );
  }

  public addStatusIcon(effect: StatusEffect) {
    const icon = new StatusEffectIcon(effect);
    icon.position.set(icon.width * 1.25 * this.icons.length, 0);
    this.addChild(icon);

    icon.redraw();

    this.icons.push(icon);
  }

  onEffectEnded(effect: StatusEffect) {
    const index = this.icons.findIndex(icon => icon.statusEffect === effect); //TODO: Non-reference comparison?
    const icon = this.icons[index];
    this.icons.splice(index, 1);
    this.removeChild(icon);
  }

  redraw() {
    console.log(this.icons.length);
    this.icons.forEach(icon => icon.redraw());
  }
}
