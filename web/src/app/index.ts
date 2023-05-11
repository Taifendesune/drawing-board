import Renderer from './renderer/Renderer';
import ToolSet from './tools';
import Pencil from './tools/Pencil';

interface DrawingBoardOptions {
  container: HTMLElement;
}

class DrawingBoard {
  renderer: Renderer;
  toolSet: ToolSet;

  constructor({ container }: DrawingBoardOptions) {
    this.renderer = new Renderer({ container });
    this.toolSet = new ToolSet([new Pencil(this.renderer)]);
  }
}

export default DrawingBoard;
