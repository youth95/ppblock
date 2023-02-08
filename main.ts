import { Block, Direction, Game } from './game';
import Hammer from 'hammerjs';

const container = document.querySelector('#container') as HTMLDivElement;
const h = new Hammer(window.document.body);

const toDirection: Record<string, Direction> = {
  w: Direction.Top,
  a: Direction.Left,
  s: Direction.Down,
  d: Direction.Right,
}

const htoDirection: Record<number, Direction> = {
  8: Direction.Top,
  16: Direction.Down,
  2: Direction.Left,
  4: Direction.Right,
};

let transitioning = false;
container?.addEventListener('transitionstart', () => transitioning = true);
container?.addEventListener('transitionend', () => transitioning = false);
let source = 0;

const clearOpacityDOM = () => {
  document.querySelectorAll('.block').forEach(el => {
    if ((el as HTMLDivElement).style.opacity === '0') {
      el.remove();
    }
  })
}

window.addEventListener('keypress', ev => {
  move(toDirection[ev.key]);
});

h.get('pan').set({ direction: Hammer.DIRECTION_ALL });
h.on('panend', ev => {
  const dir = htoDirection[ev.direction];
  console.log(ev.direction);
  if (dir) {
    move(dir);
  }
})


function move(dir: Direction) {
  if (!transitioning) {
    clearOpacityDOM();
    game.move(dir);
    setTimeout(() => {
      const removed = game.remove();
      if (removed.length) {
        source += removed.length;
        document.getElementById('source')!.textContent = `分数: ${source}`;
        removed.forEach((b) => {
          const dom = record.get(b);
          dom!.style.opacity = '0';
        });
        setTimeout(() => {
          game.randomCreateShape();
          // game.remove();
          // TODO test remove
        }, 300);
      } else {
        game.randomCreateShape();
      }
    }, 400);
  }
}

function gameLoop() {
  render();
  requestAnimationFrame(gameLoop);
}

const game = new Game();




const record: WeakMap<Block, HTMLDivElement> = new WeakMap();

const render = () => {
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const shape = game.board[i][j];
      if (shape !== null) {
        shape.blocks.forEach(b => {
          let dom = record.get(b);
          if (!dom) {
            dom = document.createElement('div');
            container.appendChild(dom);
            dom.className = 'block';
            dom.style.backgroundColor = shape.color;
            record.set(b, dom);
          }
          dom.style.left = `${b.x * 40}px`;
          dom.style.top = `${b.y * 40}px`;
        });

      }
    }
  }
  renderNext();
}

const renderNext = () => {
  const container = document.getElementById('next')! as HTMLDivElement;
  container.innerHTML = '';
  const color = game.nextShape.color;
  const blocks = game.nextShape.blocks;

  for (const b of blocks) {
    // let dom = record.get(b);
    // if (!dom) {
    const dom = document.createElement('div');
    dom.className = 'block';
    dom.style.left = `${b.x * 40}px`;
    dom.style.top = `${b.y * 40}px`;
    dom.style.backgroundColor = color;
    // record.set(b, dom);
    container.appendChild(dom);
    // }
  }
}

render();
gameLoop();


(window as any).game = game;