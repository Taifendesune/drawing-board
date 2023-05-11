import DragHandler from './events/DragHandler';
import { Coord, PaperEvent } from './types';
import EventEmitter, { NativeEventsMap } from './utils/EventEmitter';
import Point from './utils/Point';

interface RendererOptions {
  container: HTMLElement;
}

class Renderer extends EventEmitter {
  container: HTMLElement;
  rendering: boolean = false;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  width = 36;
  height = 36;
  zoom = 1;
  transform: [number, number, number, number, number, number];
  data: string[][];

  constructor({ container }: RendererOptions) {
    super();
    const canvas = this.initCanvas(container);
    this.container = container;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.data = this.initData();
    this.transform = [
      1,
      0,
      0,
      1,
      this.canvas.width / 2 - this.width * 5,
      this.canvas.height / 2 - this.height * 5,
    ];
    this.addListeners();
    this.requestRender();
  }

  private initData() {
    const data: string[][] = [];
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        if (!data[i]) data[i] = [];
        data[i][j] = '';
      }
    }
    return data;
  }

  private initCanvas(container: HTMLElement) {
    const canvas = document.createElement('canvas');
    canvas.width = container.clientWidth;
    canvas.height = container.clientHeight;
    container.appendChild(canvas);
    return canvas;
  }

  resize(width: number, height: number) {
    this.canvas.width = width;
    this.canvas.height = height;
    this.requestRender();
  }

  requestRender() {
    if (!this.rendering) {
      this.rendering = true;
      requestAnimationFrame(this.render);
    }
  }

  render = () => {
    this.clearContext();
    this.renderBackground();
    this.renderData();
    this.rendering = false;
  };

  clearContext = () => {
    if (!this.ctx) return;
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  };

  renderBackground() {
    if (!this.ctx) return;
    this.ctx.save();
    this.ctx.fillStyle = '#efefef';
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.transform(...this.transform);
    this.ctx.fillStyle = '#66ccff';
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.ctx.fillRect(i * 10, j * 10, 10, 10);
      }
    }
    this.ctx.fill();
    this.ctx.restore();
  }

  renderData() {
    if (!this.ctx) return;
    this.ctx.save();
    this.ctx.transform(...this.transform);
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        const fill = this.data[i][j];
        if (fill) {
          this.ctx.beginPath();
          this.ctx.fillStyle = fill;
          this.ctx.fillRect(i * 10, j * 10, 10, 10);
        }
      }
    }
    this.ctx.restore();
  }

  translate(x: number, y: number) {
    this.transform[4] += x * this.zoom;
    this.transform[5] += y * this.zoom;
    this.requestRender();
  }

  zoomToPoint() {}

  modifyData = (x: number, y: number, value: string) => {
    if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
      this.data[x][y] = value;
      this.requestRender();
    }
  };

  getPaperCoord(e: PointerEvent): Coord {
    const { x, y } = e;
    // TODO 考虑 zoom
    const xCoord = Math.floor((x - this.transform[4]) / 10);
    const yCoord = Math.floor((y - this.transform[5]) / 10);
    return [xCoord, yCoord];
  }

  private handlePointerDown = (e: PointerEvent) => {
    this.emit('pointerdown', e);
    this.emit('paper:pointerdown', { e, coord: this.getPaperCoord(e) });
  };

  private handlePointerMove = (e: PointerEvent) => {
    this.emit('pointermove', e);
    this.emit('paper:pointermove', { e, coord: this.getPaperCoord(e) });
  };

  private handlePointerUp = (e: PointerEvent) => {
    this.emit('pointerup', e);
    this.emit('paper:pointerup', { e, coord: this.getPaperCoord(e) });
  };

  private addListeners() {
    this.canvas.addEventListener('pointerdown', this.handlePointerDown);
    this.canvas.addEventListener('pointermove', this.handlePointerMove);
    this.canvas.addEventListener('pointerup', this.handlePointerUp);

    new DragHandler(this);
  }

  private removeListerners() {
    this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
    this.canvas.removeEventListener('pointermove', this.handlePointerMove);
    this.canvas.removeEventListener('pointerup', this.handlePointerUp);

    new DragHandler(this);
  }

  destroy() {
    this.removeListerners();
  }
}

export default Renderer;
