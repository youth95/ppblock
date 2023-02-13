import { Block, BlockProp, Direction, Game } from './game';
import Hammer from 'hammerjs';

export class Application {
  gameOver = false;
  game = new Game();
  time = 0;
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
    window.addEventListener('keypress', ev => {
      if (ev.key === ' ' && this.gameOver) {
        this.restart();
      }
    });
    setInterval(() => {
      if (this.gameOver) {
        return
      }
      this.time += 1;
      this.renderTime();
    }, 1000);
    (window as any).app = this;
  }

  private renderTime() {
    const m = Math.floor(this.time / 60);
    const s = Math.floor(this.time % 60);
    document.getElementById('time')!.textContent = m.toString().padStart(2, '0') + ':' + s.toString().padStart(2, '0');

  }

  gameLoop() {
    this.render();
    this.renderBoard();
    requestAnimationFrame(this.gameLoop.bind(this));
  }

  renderBoard() {
    const els = [
      '#next',
      '.source',
      '#container',
      '#message',
      '#title',
    ];
    if (this.game.pos.length === 0) {
      els.forEach(selector => (document.querySelector(selector) as HTMLDivElement).style.borderColor = 'red');
    } else {
      els.forEach(selector => (document.querySelector(selector) as HTMLDivElement).style.borderColor = '#fff');
    }

  }

  restart() {
    this.gameOver = false;
    this.game = new Game();
    this.record = new WeakMap();
    this.transitioning = false;
    this.source = 0;
    this.time = 0;
    this.container.innerHTML = '';
    document.getElementById('source')!.textContent = this.source.toString();
    this.renderTime();

  }

  move(dir?: Direction) {
    if (!this.transitioning && dir && this.gameOver === false) {
      this.clearOpacityDOM();
      const dis = this.game.move(dir);
      const create = () => {
        try {
          this.game.randomCreateShape();
        } catch (error) {
          this.gameOver = true;
        }
      };
      const removeAndCreate = () => {
        const removed = this.game.remove();
        if (removed.length) {
          this.source += removed.length;
          document.getElementById('source')!.textContent = this.source.toString();
          removed.forEach((b) => {
            const dom = this.record.get(b);
            dom!.style.opacity = '0';
            dom!.style.transform = 'scale(0)'
          });
          this.container.addEventListener('transitionend', create, { once: true });
        } else {
          create();
        }
      }
      if (dis.filter(v => v !== 0).length) {
        this.container.addEventListener('transitionend', removeAndCreate, { once: true });
      } else {
        removeAndCreate();
      }
    }
  }

  clearOpacityDOM = () => {
    document.querySelectorAll('.block').forEach(el => {
      if ((el as HTMLDivElement).style.opacity === '0') {
        el.remove();
      }
    })
  }

  propImageMapper: Record<BlockProp, string> = {
    [BlockProp.Apple]: 'image/apple.png',
    [BlockProp.Banana]: 'image/banana.png',
    [BlockProp.Cherry]: 'image/cherry.png',
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
              if (b.prop) {
                dom.style.backgroundImage = `url(${this.propImageMapper[b.prop]})`;
              }
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
      if (dom.dataset.beforeJoin !== children.join(' ')) {
        dom.innerHTML = '';
        children.forEach(className => {
          const d = document.createElement('div');
          d.className = className;
          d.style.backgroundColor = b.shape.color;
          dom?.appendChild(d);
        });
        dom.dataset.beforeJoin = children.join(' ')
      }
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
        if (b.prop) {
          dom.style.backgroundImage = `url(${this.propImageMapper[b.prop]})`;
        }
        dom.style.backgroundColor = color;
        this.container.appendChild(dom);
        this.record.set(b, dom);
      }

    }
  }
}