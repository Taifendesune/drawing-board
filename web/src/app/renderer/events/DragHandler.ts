import type Renderer from '../Renderer';
import Point from '../utils/Point';

class DragHandler {
  renderer: Renderer;
  originPoint: Point | null = null;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
    renderer.canvas.addEventListener('mousedown', this.mouseDownListener);
    renderer.canvas.addEventListener('mousemove', this.mouseMoveListener);
    renderer.canvas.addEventListener('mouseup', this.mouseUpListener); // blur
  }

  mouseDownListener = (e: MouseEvent) => {
    if (e.button !== 1) return;
    this.originPoint = new Point(e.clientX, e.clientY);
  };

  mouseMoveListener = (e: MouseEvent) => {
    if (!this.originPoint) return;
    const point = new Point(e.clientX, e.clientY);
    if (this.originPoint.x !== point.x || this.originPoint.y !== point.y) {
      this.renderer.translate(
        point.x - this.originPoint.x,
        point.y - this.originPoint.y
      );
      console.log(point);
      this.originPoint = point;
    }
  };

  mouseUpListener = (e: MouseEvent) => {
    this.originPoint = null;
  };
}

export default DragHandler;
