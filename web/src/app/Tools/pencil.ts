import Renderer from '../renderer/Renderer';
import { Coord, PaperEvent } from '../renderer/types';
import Tool from './Tool';

class Pencil extends Tool {
  name = 'pencil';
  prevCoord: Coord | null = null;
  prevCoord2: Coord | null = null;
  drawing: boolean = false;
  constructor(render: Renderer) {
    super(render);
    this.register();
  }

  register() {
    this.renderer.on('paper:pointerdown', this.onPointerDown);
    this.renderer.on('paper:pointermove', this.onPointerMove);
    this.renderer.on('paper:pointerup', this.onPointerUp);
  }

  // 存在 bug 切换成其他 tool 后drawing可能为true
  onPointerDown = (e: PaperEvent) => {
    if (!this.active) return;
    const [x, y] = e.coord;
    this.renderer.modifyData(x, y, '#eeffff');
    this.drawing = true;
    this.prevCoord = e.coord;
  };

  onPointerMove = (e: PaperEvent) => {
    if (!this.active) return;
    if (!this.drawing) {
      if (this.prevCoord) this.renderer.modifyData(...this.prevCoord, '');
      this.renderer.modifyData(...e.coord, '#eeffff');
      this.prevCoord = e.coord;
      return;
    }
    const [x, y] = e.coord;

    if (x !== this.prevCoord?.[0] || y !== this.prevCoord?.[1]) {
      this.renderer.modifyData(x, y, '#eeffff');
      if (
        this.prevCoord2 &&
        x !== this.prevCoord2[0] &&
        y !== this.prevCoord2[1]
      ) {
        this.renderer.modifyData(...this.prevCoord!, '');
        this.prevCoord = e.coord;
        this.prevCoord2 = null;
      } else {
        this.prevCoord2 = this.prevCoord;
        this.prevCoord = e.coord;
      }
    }
  };

  onPointerUp = (e: PaperEvent) => {
    if (!this.active) return;
    this.drawing = false;
  };
}

export default Pencil;
