import { Block, Direction, Game } from './game';
import Hammer from 'hammerjs';

export class Application {
  gameOver = false;
  game = new Game();
  record: WeakMap<Block, HTMLDivElement> = new WeakMap();
  transitioning = false;
  source = 0;
  container = document.querySelector('#container') as HTMLDivElement;
  h = new Hammer(window.document.body);
  toDirection: Record<string, Direction> = {
    w: Direction.Top,
    a: Direction.Left,
    s: Direction.Down,
    d: Direction.Right,
  }
  htoDirection: Record<number, Direction> = {
    8: Direction.Top,
    16: Direction.Down,
    2: Direction.Left,
    4: Direction.Right,
  };


  constructor() {
    this.container?.addEventListener('transitionstart', () => this.transitioning = true);
    this.container?.addEventListener('transitionend', () => this.transitioning = false);
    window.addEventListener('keypress', ev => this.move(this.toDirection[ev.key]));
    this.h.get('pan').set({ direction: Hammer.DIRECTION_ALL });
    this.h.on('panend', ev => this.move(this.htoDirection[ev.direction]));
    this.h.on('tap', ev => {
      if (this.gameOver) {
        this.restart();
      }
    });
    (window as any).app = this;
  }

  gameLoop() {
    this.render();
    this.renderBoard();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  renderBoard() {
    if (this.game.pos.length === 0) {
      (document.querySelector('#next') as HTMLDivElement).style.borderColor = 'red';
      (document.querySelector('.source') as HTMLDivElement).style.borderColor = 'red';
      (document.querySelector('#container') as HTMLDivElement).style.borderColor = 'red';
    } else {
      (document.querySelector('#next') as HTMLDivElement).style.borderColor = '#fff';
      (document.querySelector('.source') as HTMLDivElement).style.borderColor = '#fff';
      (document.querySelector('#container') as HTMLDivElement).style.borderColor = '#fff';
    }

  }

  restart() {
    this.gameOver = false;
    this.game = new Game();
    this.record = new WeakMap();
    this.transitioning = false;
    this.source = 0;
    this.container.innerHTML = '';
    document.getElementById('source')!.textContent = this.source.toString();
  }

  move(dir?: Direction) {
    if (!this.transitioning && dir && this.gameOver === false) {
      this.clearOpacityDOM();
      this.game.move(dir);

      setTimeout(() => {
        const removed = this.game.remove();
        if (removed.length) {
          this.source += removed.length;
          document.getElementById('source')!.textContent = this.source.toString();
          removed.forEach((b) => {
            const dom = this.record.get(b);
            dom!.style.opacity = '0';
            dom!.style.transform = 'scale(0)'
          });
          setTimeout(() => {
            try {
              this.game.randomCreateShape();
            } catch (error) {
              this.gameOver = true;
            }
          }, 300);
        } else {
          try {
            this.game.randomCreateShape();
          } catch (error) {
            this.gameOver = true;
          }
        }
      }, 400);
    }
  }

  clearOpacityDOM = () => {
    document.querySelectorAll('.block').forEach(el => {
      if ((el as HTMLDivElement).style.opacity === '0') {
        el.remove();
      }
    })
  }

  render = () => {
    if (this.gameOver) {
      if (!document.querySelector('.game-over')) {
        const gameOverDOM = document.createElement('div');
        gameOverDOM.className = 'game-over';
        this.container.appendChild(gameOverDOM);
      }
      return
    }
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        const shape = this.game.board[i][j];
        if (shape !== null) {
          shape.blocks.forEach(b => {
            let dom = this.record.get(b);
            if (!dom) {
              dom = document.createElement('div');
              const count = document.createElement('div');
              count.className = 'count';
              dom.appendChild(count);
              this.container.appendChild(dom);
              dom.className = 'block';
              dom.style.backgroundColor = shape.color;
              this.record.set(b, dom);
            }
            dom.style.left = `${b.x * 40}px`;
            dom.style.top = `${b.y * 40}px`;
          });

        }
      }
    }
    [this.game.nextShape, ...this.game.board.flat()].forEach(shape => shape?.blocks.forEach(this.createJoinInDOM));
    this.renderNext();
  }

  createJoinInDOM = (b: Block) => {
    let dom = this.record.get(b);
    if (dom) {
      dom.innerHTML = '';
      const children: string[] = [];
      if (b.shape.blocks.find(v => v.x === b.x + 1 && v.y === b.y)) {
        // right
        children.push('block-right');
      }
      if (b.shape.blocks.find(v => v.x === b.x - 1 && v.y === b.y)) {
        // left
        children.push('block-left');
      }
      if (b.shape.blocks.find(v => v.x === b.x && v.y === b.y + 1)) {
        // bottom
        children.push('block-bottom');
      }
      if (b.shape.blocks.find(v => v.x === b.x && v.y === b.y - 1)) {
        // top
        children.push('block-top');
      }
      children.forEach(className => {
        const d = document.createElement('div');
        d.className = className;
        dom?.appendChild(d);
      });
      const count = document.createElement('div');
      count.className = 'count';
      dom.appendChild(count);
      count.textContent = b.shape.blocks.length.toString();
    }
  }

  renderNext = () => {
    const color = this.game.nextShape.color;
    const blocks = this.game.nextShape.blocks;

    for (const b of blocks) {
      let dom = this.record.get(b);
      if (!dom) {
        const dom = document.createElement('div');
        dom.className = 'block';
        dom.style.left = `${(b.x + 4) * 40}px`;
        dom.style.top = `${(b.y - 4) * 40}px`;
        const count = document.createElement('div');
        count.className = 'count';
        dom.appendChild(count);
        dom.style.backgroundColor = color;
        this.container.appendChild(dom);
        this.record.set(b, dom);
      }

    }
  }
}