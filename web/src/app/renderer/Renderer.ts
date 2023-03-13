class Renderer {
  rendering: boolean = false;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D | null;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.ctx = this.canvas.getContext('2d');
  }

  requestRender() {
    if (!this.rendering) {
      this.rendering = true;
      requestAnimationFrame(this.render);
    }
  }

  render = () => {
    this.renderBackground();
    this.renderData();
    this.rendering = false;
  };

  renderBackground() {
    if (!this.ctx) return;
    this.ctx.fillStyle = '#efefef';
    this.ctx.rect(0, 0, this.canvas.width, this.canvas.height);
    this.ctx.fill();
    this.ctx.fillStyle = '#000';
  }

  renderData() {}
}

export default Renderer;
