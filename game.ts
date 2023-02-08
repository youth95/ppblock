import seedRandom from 'seedrandom';

export enum Direction {
  Top = 'top',
  Left = 'left',
  Down = 'down',
  Right = 'right',
}

export interface Block {
  x: number;
  y: number;
  shape: Shape;
}

export interface Shape {
  id: number;
  blocks: Block[];
  active: boolean;
  color: string;
}

const init = (old?: (Shape | null)[][]) => {
  let newBoard: (Shape | null)[][] = [];
  for (let i = 0; i < 8; i++) {
    newBoard[i] = [];
    for (let j = 0; j < 8; j++) {
      newBoard[i][j] = old?.[i][j] ?? null;
    }
  }
  return newBoard;
}


export class Game {
  private AUTO_ID = 0;
  private random = seedRandom();
  private allShapes: Shape[] = [];
  static DEFAULT_SHAPES_POOL: Omit<Block, 'shape'>[][] = [
    /**
     * **
     * **
     */
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
    ],
    /**
     * **
     * *
     * *
     */
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 0, y: 2 },
    ],

    /**
     *  *
     * ***
     */
    [
      { x: 1, y: 0 },
      { x: 0, y: 1 },
      { x: 1, y: 1 },
      { x: 2, y: 1 },
    ],
    /**
     * ****
     */
    [
      { x: 0, y: 0 },
      { x: 1, y: 0 },
      { x: 2, y: 0 },
      { x: 3, y: 0 },
    ],
  ];


  board: (Shape | null)[][] = init();
  nextShape: Shape;
  constructor(seed?: string) {
    this.random = seedRandom(seed);
    this.nextShape = this.createShapeInPool();
    this.randomCreateShape();
  }


  randomCreateShape() {
    const shape = this.nextShape;
    const index: number[][] = [];
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (shape.blocks.every(
          ({ x, y }) =>
            x + j >= 0
            && y + i >= 0
            &&
            x + j < 8
            && y + i < 8
            && this.board[y + i][x + j] === null
        )) {
          index.push([j, i]);
        }
      }
    }
    if (index.length === 0) {
      throw new Error('no empty');
    }
    const [x, y] = this.randomFetch(index)!;
    this.appendShape(shape, x, y);

    this.nextShape = this.createShapeInPool();
  };

  private createShapeInPool() {
    const blocks = this.randomFetch(Game.DEFAULT_SHAPES_POOL);
    const r = () => Math.floor(this.random() * 200);
    const shape = this.createShape(blocks, `rgb(${r()},${r()},${r()})`);
    return shape;
  }




  createShape(blocks: Omit<Block, 'shape'>[], color: string) {
    const shape: Shape = { blocks: [], active: false, color: '', id: this.AUTO_ID++ };
    shape.blocks = blocks.map(b => ({ ...b, shape }));
    shape.color = color;
    return shape;
  }

  createShapeAndAppend(x: number, y: number, blocks: Omit<Block, 'shape'>[], color: string) {
    const shape = this.createShape(blocks, color);
    this.appendShape(shape, x, y);
    return shape;
  }



  move(dir: Direction) {
    this.activeAll();
    const axis = (): 'x' | 'y' => dir === Direction.Down || dir === Direction.Top ? 'y' : 'x';
    const dis = this.allShapes.filter(shape => shape.active).map(shape => this.dis(shape, dir));
    this.allShapes.forEach((shape, i) => {
      axis() === 'y' ? this.shapeMoveTo(shape, 0, dis[i]) : this.shapeMoveTo(shape, dis[i], 0);
    })
    return dis;
  }

  remove() {
    const need = this.needRemove();
    need.forEach(b => {
      const idx = b.shape.blocks.findIndex(v => v === b);
      b.shape.blocks.splice(idx, 1);
      this.board[b.y][b.x] = null;
      // 删除掉空的shape
      if (b.shape.blocks.length === 0) {
        const idx = this.allShapes.findIndex(shape => shape === b.shape);
        this.allShapes.splice(idx, 1);
      }
    });
    // 分裂shape
    Array.from(new Set(need.map(b => b.shape)).values()).forEach(shape => {
      if (shape.blocks.length !== 0) {
        this.splitShape(shape);
      }
    })
    return need;
  }

  get snap() {
    const dic = '0123456789abcdefghijklmnopqrstuvwxyz'
    return this.board.map(row => row.map(v => v !== null ? dic[v.id % dic.length] : '_').join(' ')).join('\n');
  }



  toJSON() {
    return this.board.map(row => row.map(shape => shape ? ({
      ...shape,
      blocks: shape.blocks.map(b => ({ ...b, shape: null })),
    }) : null))
  }

  private appendShape(shape: Shape, x: number, y: number) {
    shape.blocks.forEach(b => {
      b.x += x;
      b.y += y;
    });
    for (const b of shape.blocks) {
      this.board[b.y][b.x] = shape;
    }
    this.allShapes.push(shape);
  }

  private needRemove() {
    const remove = new Set<Block>();
    for (let i = 0; i < 8; i++) {
      const col = this.board[i];
      if (col.every(v => v !== null)) {
        col.forEach((shape, j) => remove.add(shape!.blocks.find(b => b.x === j && b.y === i)!))
      }
      const row = this.board.map(col => col[i]).flat();
      if (row.every(v => v !== null)) {
        row.forEach((shape, j) => remove.add(shape!.blocks.find(b => b.x === i && b.y === j)!))
      }
    }
    return Array.from(remove);
  }

  /**
   * 分割
   * @param shape 
   * @param b 
   */
  private splitShape(shape: Shape): Shape[] {
    const roots = new Set([...shape.blocks]);
    const blocks: Block[][] = [];
    const shapes: Shape[] = [];
    while (roots.size) {
      const b = roots.values().next().value;
      blocks.push(this.dfs(b, roots));
    }

    for (let i = 0; i < blocks.length; i++) {
      if (i === 0) {
        shape.blocks = blocks[i];
        shapes.push(shape);
      } else {
        const newShape: Shape = { blocks: [], active: false, color: '', id: this.AUTO_ID++ };
        newShape.blocks = blocks[i];
        newShape.blocks.forEach(b => b.shape = newShape);
        shapes.push(newShape);
      }
    }
    for (const shape of shapes) {
      for (const b of shape.blocks) {
        this.board[b.y][b.x] = shape;
      }
      if (!this.allShapes.includes(shape)) {
        this.allShapes.push(shape);
      }
    }
    return shapes;

  }

  private dfs(b: Block, roots: Set<Block>): Block[] {
    roots.delete(b);
    let result: Block[] = [];
    result.push(b);
    const blocks = Array.from(roots.values());
    const { x, y } = b;

    let testBlock = blocks.find(v => v.x === x + 1 && v.y === y);
    if (this.isJoin(b, testBlock)) {
      result = result.concat(this.dfs(testBlock!, roots));
    }
    testBlock = blocks.find(v => v.x === x - 1 && v.y === y);
    if (this.isJoin(b, testBlock)) {
      result = result.concat(this.dfs(testBlock!, roots));
    }
    testBlock = blocks.find(v => v.x === x && v.y === y + 1);
    if (this.isJoin(b, testBlock)) {
      result = result.concat(this.dfs(testBlock!, roots));

    }
    testBlock = blocks.find(v => v.x === x && v.y === y - 1);
    if (this.isJoin(b, testBlock)) {
      result = result.concat(this.dfs(testBlock!, roots));
    }
    return result;
  }

  private isJoin(a?: Block, b?: Block) {
    if (!a || !b) {
      return false
    }
    const isSameAxis = a.x === b.x || a.y === b.y;
    return isSameAxis && a.shape === b.shape;
  }

  private activeAll() {
    this.allShapes.forEach(shape => shape.active = true);
  }
  private randomFetch = <T>(arr: T[]) => arr[Math.floor(this.random() * arr.length)];

  private dis(shape: Shape, dir: Direction, minDis = new WeakMap<Shape, number>()) {
    const axis = (): 'x' | 'y' => dir === Direction.Down || dir === Direction.Top ? 'y' : 'x';
    const isEmpty = (target: Shape, x: number, y: number) => {
      return (x >= 0 && y >= 0 && x < 8 && y < 8) && (this.board[y][x] === target || this.board[y][x] === null || this.board[y][x]?.active === false);
    }
    const step = (v: number) => isJust() ? v + 1 : v - 1;
    const isJust = () => dir === Direction.Right || dir === Direction.Down;
    const dts = shape.blocks.map(b => {
      let t = b[axis()];
      if (axis() === 'y') {
        while (isEmpty(shape, b.x, t)) {
          t = step(t);
        };
        if (t < 8 && t >= 0 && this.board[t][b.x] !== null) {
          const next = this.board[t][b.x];
          if (!next) {
            throw new Error('no shape');
          }
          if (!minDis.get(next)) {
            minDis.set(next, this.dis(next, dir, minDis));
          }
          t += minDis.get(next) ?? 0;
        }
      } else {
        while (isEmpty(shape, t, b.y)) {
          t = step(t);
        }
        if (t < 8 && t >= 0 && this.board[b.y][t] !== null) {
          const next = this.board[b.y][t];
          if (!next) {
            throw new Error('no shape');
          }
          if (!minDis.get(next)) {
            minDis.set(next, this.dis(next, dir, minDis));
          }
          t += minDis.get(next) ?? 0;
        }
      }
      const od = isJust() ? t - b[axis()] - 1 : t - b[axis()] + 1;
      return Math.abs(od);
    });
    let d = Math.min(...dts);
    return isJust() ? d : -d;
  }

  private shapeMoveTo(target: Shape, dx: number, dy: number) {
    if (dx === 0 && dy === 0) {
      return
    }
    target.blocks.forEach(b => {
      if (target === this.board[b.y][b.x]) {
        this.board[b.y][b.x] = null;
      }
    });
    target.blocks.forEach(b => {
      b.y += dy;
      b.x += dx;
      this.board[b.y][b.x] = target;
    });
  }



}
