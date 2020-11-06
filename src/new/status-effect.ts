import Enemy from './objects/enemy';

export default abstract class StatusEffect {
  abstract name: string;
  constructor(protected enemy: Enemy) {}
}
