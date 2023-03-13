import Renderer from './renderer/Renderer';
import Tool from './Tools';

class DrawingBoard {
  // renderer: Renderer;
  tool: Tool;

  constructor() {
    this.tool = new Tool();
  }
}

export default DrawingBoard;
