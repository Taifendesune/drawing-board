interface RendererOptions {
  container: HTMLElement;
}

class Renderer {
  container: HTMLElement;
  rendering: boolean = false;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;
  width = 36;
  height = 36;
  zoom = 1;

  constructor({ container }: RendererOptions) {
    const canvas = this.initCanvas(container);
    this.container = container;
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
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
    console.log('render');
    this.renderBackground();
    this.renderData();
    this.rendering = false;
  };

  renderBackground() {
    if (!this.ctx) return;
    this.ctx.save();
    this.ctx.fillStyle = '#efefef';
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.beginPath();
    this.ctx.transform(
      1,
      0,
      0,
      1,
      this.canvas.width / 2 - this.width * 5,
      this.canvas.height / 2 - this.height * 5
    );
    this.ctx.fillStyle = '#66ccff';
    for (let i = 0; i < this.width; i++) {
      for (let j = 0; j < this.height; j++) {
        this.ctx.fillRect(i * 10, j * 10, 10, 10);
      }
    }
    this.ctx.fill();
    this.ctx.restore();
  }

  renderData() {}

  destroy() {}
}

export default Renderer;
