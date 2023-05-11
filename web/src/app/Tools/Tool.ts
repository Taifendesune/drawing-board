import Renderer from '../renderer/Renderer';

abstract class Tool {
  abstract name: string;
  active: boolean = false;

  constructor(readonly renderer: Renderer) {}

  setActive(active: boolean) {
    this.active = active;
  }
}

export default Tool;
