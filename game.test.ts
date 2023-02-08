import { Direction, Game } from './game';
import { test, expect } from 'vitest';

expect.addSnapshotSerializer({
  test(val) {
    return val instanceof Game;
  },
  serialize(val) {
    return val.snap;
  },
})

test('should randomCreate', () => {
  const g = new Game();
  g.createShape(0, 0, [{ x: 0, y: 0 }, { x: 1, y: 0 }], 'red');
  expect(g).toMatchInlineSnapshot(`
    0 0 _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
  `);
  g.createShape(1, 1, [{ x: 0, y: 0 }, { x: 1, y: 0 }], 'red');
  expect(g).toMatchInlineSnapshot(`
    0 0 _ _ _ _ _ _
    _ 1 1 _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
  `);
});

test('move case 1', () => {
  const g = new Game();
  g.createShape(0, 0, [{ x: 0, y: 0 }, { x: 1, y: 0 }], 'red');
  g.createShape(1, 1, [{ x: 0, y: 0 }, { x: 1, y: 0 }], 'red');
  expect(g).toMatchInlineSnapshot(`
    0 0 _ _ _ _ _ _
    _ 1 1 _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
  `);

  expect(g.move(Direction.Down)).toEqual([6, 6]);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    0 0 _ _ _ _ _ _
    _ 1 1 _ _ _ _ _
  `);

  expect(g.move(Direction.Left)).toEqual([-0, -1]);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    0 0 _ _ _ _ _ _
    1 1 _ _ _ _ _ _
  `);

  expect(g.move(Direction.Right)).toEqual([6, 6]);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ 0 0
    _ _ _ _ _ _ 1 1
  `);

  expect(g.move(Direction.Top)).toEqual([-6, -6]);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ 0 0
    _ _ _ _ _ _ 1 1
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
  `);

});

test('move case 2', () => {
  const g = new Game();
  g.createShape(0, 0, [{ x: 0, y: 0 }, { x: 1, y: 0 }], 'red');
  g.createShape(1, 1, [{ x: 0, y: 0 }, { x: 1, y: 0 }], 'red');
  g.createShape(1, 2, [{ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 1, y: 1 }], 'red');
  expect(g).toMatchInlineSnapshot(`
    0 0 _ _ _ _ _ _
    _ 1 1 _ _ _ _ _
    _ 2 _ _ _ _ _ _
    _ 2 2 _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
  `);
  expect(g.move(Direction.Down));
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    0 0 _ _ _ _ _ _
    _ 1 1 _ _ _ _ _
    _ 2 _ _ _ _ _ _
    _ 2 2 _ _ _ _ _
  `);
  expect(g.move(Direction.Left));
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    0 0 _ _ _ _ _ _
    1 1 _ _ _ _ _ _
    2 _ _ _ _ _ _ _
    2 2 _ _ _ _ _ _
  `);
  expect(g.move(Direction.Right));
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ 0 0
    _ _ _ _ _ _ 1 1
    _ _ _ _ _ _ 2 _
    _ _ _ _ _ _ 2 2
  `);
  expect(g.move(Direction.Top));
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ 0 0
    _ _ _ _ _ _ 1 1
    _ _ _ _ _ _ 2 _
    _ _ _ _ _ _ 2 2
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
  `);
});

test('move case 3', () => {
  const g = new Game('random');
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ 0 0 _ _ _ _ _
    _ 0 _ _ _ _ _ _
    _ 0 _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ 0 0 _ _ 1 1 _
    _ 0 _ _ _ 1 1 _
    _ 0 _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ 2 2 _
    _ _ _ _ _ 2 2 _
    _ _ _ _ _ _ _ _
    _ 0 0 _ _ 1 1 _
    _ 0 _ _ _ 1 1 _
    _ 0 _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ 2 2 _
    _ _ _ _ _ 2 2 _
    _ _ _ _ _ _ _ _
    _ 0 0 _ _ 1 1 _
    _ 0 _ _ _ 1 1 _
    _ 0 _ _ _ _ _ _
    _ 3 3 3 3 _ _ _
    _ _ _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ 2 2 _
    _ _ 4 4 _ 2 2 _
    _ _ 4 4 _ _ _ _
    _ 0 0 _ _ 1 1 _
    _ 0 _ _ _ 1 1 _
    _ 0 _ _ _ _ _ _
    _ 3 3 3 3 _ _ _
    _ _ _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ 2 2 _
    _ _ 4 4 _ 2 2 _
    _ _ 4 4 _ _ _ _
    _ 0 0 5 _ 1 1 _
    _ 0 5 5 5 1 1 _
    _ 0 _ _ _ _ _ _
    _ 3 3 3 3 _ _ _
    _ _ _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ 2 2 _
    _ _ 4 4 _ 2 2 _
    _ _ 4 4 _ _ _ _
    _ 0 0 5 _ 1 1 _
    _ 0 5 5 5 1 1 _
    _ 0 _ _ _ _ _ _
    _ 3 3 3 3 _ _ _
    _ _ 6 6 6 6 _ _
  `);
  g.move(Direction.Down);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ 4 4 _ _ _ _
    _ _ 4 4 _ _ _ _
    _ 0 0 _ _ 2 2 _
    _ 0 _ 5 _ 2 2 _
    _ 0 5 5 5 1 1 _
    _ 3 3 3 3 1 1 _
    _ _ 6 6 6 6 _ _
  `);
  g.move(Direction.Right);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ 4 4
    _ _ _ _ _ _ 4 4
    _ _ 0 0 _ _ 2 2
    _ _ 0 _ 5 _ 2 2
    _ _ 0 5 5 5 1 1
    _ _ 3 3 3 3 1 1
    _ _ _ _ 6 6 6 6
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ 7 _ _ _ _ _ _
    7 7 7 _ _ _ 4 4
    _ _ _ _ _ _ 4 4
    _ _ 0 0 _ _ 2 2
    _ _ 0 _ 5 _ 2 2
    _ _ 0 5 5 5 1 1
    _ _ 3 3 3 3 1 1
    _ _ _ _ 6 6 6 6
  `);
  g.move(Direction.Top);
  expect(g).toMatchInlineSnapshot(`
    _ 7 _ _ _ _ 4 4
    7 7 7 _ _ _ 4 4
    _ _ 0 0 5 _ 2 2
    _ _ 0 5 5 5 2 2
    _ _ 0 _ _ _ 1 1
    _ _ 3 3 3 3 1 1
    _ _ _ _ 6 6 6 6
    _ _ _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ 7 _ _ _ _ 4 4
    7 7 7 _ _ _ 4 4
    8 8 0 0 5 _ 2 2
    8 _ 0 5 5 5 2 2
    8 _ 0 _ _ _ 1 1
    _ _ 3 3 3 3 1 1
    _ _ _ _ 6 6 6 6
    _ _ _ _ _ _ _ _
  `);
  g.move(Direction.Top);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ 7 _ _ _ _ 4 4
    7 7 7 _ _ _ 4 4
    8 8 0 0 5 _ 2 2
    8 _ 0 5 5 5 2 2
    8 _ 0 _ _ _ 1 1
    _ _ 3 3 3 3 1 1
    _ _ _ 9 6 6 6 6
    _ _ 9 9 9 _ _ _
  `);
  g.move(Direction.Down);
  expect(g).toMatchInlineSnapshot(`
    _ 7 _ _ _ _ 4 4
    7 7 7 _ _ _ 4 4
    _ _ 0 0 _ _ 2 2
    _ _ 0 _ 5 _ 2 2
    _ _ 0 5 5 5 1 1
    8 8 3 3 3 3 1 1
    8 _ _ 9 6 6 6 6
    8 _ 9 9 9 _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ 7 _ _ a a 4 4
    7 7 7 _ a _ 4 4
    _ _ 0 0 a _ 2 2
    _ _ 0 _ 5 _ 2 2
    _ _ 0 5 5 5 1 1
    8 8 3 3 3 3 1 1
    8 _ _ 9 6 6 6 6
    8 _ 9 9 9 _ _ _
  `);
  g.move(Direction.Left);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ 7 _ a a 4 4 _
    7 7 7 a _ 4 4 _
    0 0 _ a 2 2 _ _
    0 _ 5 _ 2 2 _ _
    0 5 5 5 _ _ 1 1
    8 8 3 3 3 3 1 1
    8 _ 9 6 6 6 6 _
    8 9 9 9 b b b b
  `);
  g.remove();
  expect(g).toMatchInlineSnapshot(`
    _ 7 _ a a 4 4 _
    7 7 7 a _ 4 4 _
    0 0 _ a 2 2 _ _
    0 _ 5 _ 2 2 _ _
    0 5 5 5 _ _ 1 1
    _ _ _ _ _ _ _ _
    8 _ 9 6 6 6 6 _
    _ _ _ _ _ _ _ _
  `);
  g.move(Direction.Down);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ 7 _ _ _ _ _ _
    7 7 7 a a 4 4 _
    0 0 _ a _ 4 4 _
    0 _ 5 a 2 2 _ _
    0 5 5 5 2 2 1 1
    8 _ 9 6 6 6 6 _
  `);
  g.remove();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ 7 _ _ _ _ _ _
    7 7 7 a a 4 4 _
    0 0 _ a _ 4 4 _
    0 _ 5 a 2 2 _ _
    _ _ _ _ _ _ _ _
    8 _ 9 6 6 6 6 _
  `);
  g.move(Direction.Down);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ 7 _ _ _ _ _ _
    7 7 7 a a 4 4 _
    0 0 _ a _ 4 4 _
    0 _ 5 a 2 2 _ _
    8 _ 9 6 6 6 6 _
  `);

})