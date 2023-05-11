import type Renderer from '../Renderer';
import Point from '../utils/Point';

class DragHandler {
  renderer: Renderer;
  originPoint: Point | null = null;

  constructor(renderer: Renderer) {
    this.renderer = renderer;
    renderer.on('pointerdown', this.pointerDownListener);
    renderer.on('pointermove', this.pointerMoveListener);
    renderer.on('pointerup', this.pointerUpListener); // blur
  }

  pointerDownListener = (e: PointerEvent) => {
    if (e.button !== 1) return;
    this.originPoint = new Point(e.clientX, e.clientY);
  };

  pointerMoveListener = (e: PointerEvent) => {
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

  pointerUpListener = (e: PointerEvent) => {
    this.originPoint = null;
  };
}

export default DragHandler;
