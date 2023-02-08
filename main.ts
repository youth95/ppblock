import { Block, Direction, Game } from './game';
let dir: Direction | null = null;


const container = document.querySelector('#container') as HTMLDivElement;

const toDirection: Record<string, Direction> = {
  w: Direction.Top,
  a: Direction.Left,
  s: Direction.Down,
  d: Direction.Right,
}

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
  if (!transitioning) {
    clearOpacityDOM();
    dir = toDirection[ev.key];
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
        dir = null;
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
});

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
}

game.randomCreateShape();
render();
gameLoop();


(window as any).game = game;