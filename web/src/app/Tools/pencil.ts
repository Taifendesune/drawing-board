import Renderer from '../renderer/Renderer';
import { PaperEvent } from '../renderer/types';
import Tool from './Tool';

class Pencil extends Tool {
  name = 'pencil';
  constructor(render: Renderer) {
    super(render);
    this.register();
  }

  register() {
    this.renderer.on('paper:pointerdown', this.onMouseDown);
  }

  onMouseDown = (e: PaperEvent) => {
    const [x, y] = e.coord;
    this.renderer.modifyData(x, y, '#eeffff');
  };
}

export default Pencil;
