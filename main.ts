import { Block, Direction, Game } from './game';
import Hammer from 'hammerjs';
let gameOver = false;
let game = new Game();
let record: WeakMap<Block, HTMLDivElement> = new WeakMap();
let transitioning = false;
let source = 0;

const restart = () => {
  gameOver = false;
  game = new Game();
  record = new WeakMap();
  transitioning = false;
  source = 0;
  container.innerHTML = '';
  document.getElementById('source')!.textContent = source.toString();
}


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



container?.addEventListener('transitionstart', () => transitioning = true);
container?.addEventListener('transitionend', () => transitioning = false);

const clearOpacityDOM = () => {
  document.querySelectorAll('.block').forEach(el => {
    if ((el as HTMLDivElement).style.opacity === '0') {
      el.remove();
    }
  })
}

window.addEventListener('keypress', ev => move(toDirection[ev.key]));
h.get('pan').set({ direction: Hammer.DIRECTION_ALL });
h.on('panend', ev => move(htoDirection[ev.direction]));
h.on('tap', ev => {
  console.log(ev);
  if (gameOver) {
    restart();
  }
})




function move(dir?: Direction) {
  if (!transitioning && dir && gameOver === false) {
    clearOpacityDOM();
    game.move(dir);

    setTimeout(() => {
      const removed = game.remove();
      if (removed.length) {
        source += removed.length;
        document.getElementById('source')!.textContent = source.toString();
        removed.forEach((b) => {
          const dom = record.get(b);
          dom!.style.opacity = '0';
          dom!.style.transform = 'scale(0)'
        });
        setTimeout(() => {
          try {
            game.randomCreateShape();
          } catch (error) {
            gameOver = true;
          }
          // game.remove();
          // TODO test remove
        }, 300);
      } else {
        try {
          game.randomCreateShape();
        } catch (error) {
          gameOver = true;
        }
      }
    }, 400);
  }
}

function gameLoop() {
  render();
  requestAnimationFrame(gameLoop);
}



const render = () => {
  if (gameOver) {
    if (!document.querySelector('.game-over')) {
      const gameOverDOM = document.createElement('div');
      gameOverDOM.className = 'game-over';
      container.appendChild(gameOverDOM);
    }
    return
  }
  for (let i = 0; i < 8; i++) {
    for (let j = 0; j < 8; j++) {
      const shape = game.board[i][j];
      if (shape !== null) {
        shape.blocks.forEach(b => {
          let dom = record.get(b);
          if (!dom) {
            dom = document.createElement('div');
            const count = document.createElement('div');
            count.className = 'count';
            dom.appendChild(count);
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
  [game.nextShape, ...game.board.flat()].forEach(shape => shape?.blocks.forEach(createJoinInDOM));
  renderNext();
}

const createJoinInDOM = (b: Block) => {
  let dom = record.get(b);
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

const renderNext = () => {
  // const container = document.getElementById('next')! as HTMLDivElement;
  // container.innerHTML = '';
  const color = game.nextShape.color;
  const blocks = game.nextShape.blocks;

  for (const b of blocks) {
    let dom = record.get(b);
    if (!dom) {
      const dom = document.createElement('div');
      dom.className = 'block';
      dom.style.left = `${(b.x + 4) * 40}px`;
      dom.style.top = `${(b.y - 4) * 40}px`;
      const count = document.createElement('div');
      count.className = 'count';
      dom.appendChild(count);
      dom.style.backgroundColor = color;
      container.appendChild(dom);
      record.set(b, dom);
    }

  }
}

gameLoop();
// render();
game.board.flat().forEach(shape => shape?.blocks.forEach(createJoinInDOM));


(window as any).game = game;