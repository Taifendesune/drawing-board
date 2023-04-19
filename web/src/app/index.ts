import Renderer from './renderer/Renderer';
import Tool from './tools';

interface DrawingBoardOptions {
  container: HTMLElement;
}

class DrawingBoard {
  renderer: Renderer;
  tool: Tool;

  constructor({ container }: DrawingBoardOptions) {
    this.tool = new Tool();
    this.renderer = new Renderer({ container });
  }
}

export default DrawingBoard;
