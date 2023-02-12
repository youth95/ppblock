import { Direction, Game } from '../src/game';
import { test, expect } from 'vitest';

expect.addSnapshotSerializer({
  test(val) {
    return val instanceof Game;
  },
  serialize(val) {
    return val.snap;
  },
})

test('move case 3', () => {
  const g = new Game('random');
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ 0 _ _ _ _
    _ _ 0 0 0 _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ 1 _ _ _ _
    _ _ 1 1 _ _ _ _
    _ _ _ 1 _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ 0 _ _ _ _
    _ _ 0 0 0 _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ 1 _ _ _ _
    _ _ 1 1 _ _ _ _
    _ 2 _ 1 _ _ _ _
    _ 2 _ _ _ _ _ _
    _ _ _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ 0 _ _ _ _
    _ _ 0 0 0 _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ 1 _ _ _ 3
    _ _ 1 1 _ _ 3 3
    _ 2 _ 1 _ _ 3 _
    _ 2 _ _ _ _ _ _
    _ _ _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ 0 _ _ _ _
    _ _ 0 0 0 _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ 1 _ 4 _ 3
    _ _ 1 1 _ 4 3 3
    _ 2 _ 1 _ 4 3 _
    _ 2 _ _ _ 4 _ _
    _ _ _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    5 5 _ 0 _ _ _ _
    5 _ 0 0 0 _ _ _
    5 _ _ _ _ _ _ _
    _ _ _ 1 _ 4 _ 3
    _ _ 1 1 _ 4 3 3
    _ 2 _ 1 _ 4 3 _
    _ 2 _ _ _ 4 _ _
    _ _ _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    5 5 _ 0 _ _ _ _
    5 _ 0 0 0 _ _ _
    5 _ _ _ _ _ _ _
    _ 6 6 1 _ 4 _ 3
    _ _ 1 1 _ 4 3 3
    _ 2 _ 1 _ 4 3 _
    _ 2 _ _ _ 4 _ _
    _ _ _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    5 5 _ 0 _ _ _ _
    5 _ 0 0 0 7 7 7
    5 _ _ _ _ _ _ 7
    _ 6 6 1 _ 4 _ 3
    _ _ 1 1 _ 4 3 3
    _ 2 _ 1 _ 4 3 _
    _ 2 _ _ _ 4 _ _
    _ _ _ _ _ _ _ _
  `);
  g.move(Direction.Down);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ 0 _ 7 7 7
    5 5 0 0 0 4 _ 7
    5 6 6 1 _ 4 _ 3
    5 2 1 1 _ 4 3 3
    _ 2 _ 1 _ 4 3 _
  `);
  g.move(Direction.Right);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ 0 _ 7 7 7
    5 5 0 0 0 4 _ 7
    5 _ 6 6 1 4 _ 3
    5 _ 2 1 1 4 3 3
    _ _ 2 _ 1 4 3 _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ 8 8 _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ 0 _ 7 7 7
    5 5 0 0 0 4 _ 7
    5 _ 6 6 1 4 _ 3
    5 _ 2 1 1 4 3 3
    _ _ 2 _ 1 4 3 _
  `);
  g.move(Direction.Top);
  expect(g).toMatchInlineSnapshot(`
    5 5 _ 8 8 7 7 7
    5 _ _ 0 _ 4 _ 7
    5 _ 0 0 0 4 _ 3
    _ _ 6 6 1 4 3 3
    _ _ 2 1 1 4 3 _
    _ _ 2 _ 1 _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    5 5 _ 8 8 7 7 7
    5 _ _ 0 _ 4 _ 7
    5 _ 0 0 0 4 _ 3
    _ _ 6 6 1 4 3 3
    _ _ 2 1 1 4 3 9
    _ _ 2 _ 1 _ _ 9
    _ _ _ _ _ _ 9 9
    _ _ _ _ _ _ _ _
  `);
  g.move(Direction.Top);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    5 5 _ 8 8 7 7 7
    5 _ _ 0 _ 4 _ 7
    5 _ 0 0 0 4 _ 3
    _ _ 6 6 1 4 3 3
    _ _ 2 1 1 4 3 9
    _ _ 2 _ 1 a _ 9
    _ _ _ _ _ a 9 9
    _ _ _ _ _ _ _ _
  `);
  g.move(Direction.Down);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ 7 7 7
    _ _ _ 8 8 4 _ 7
    _ _ _ 0 _ 4 _ 3
    _ _ 0 0 0 4 3 3
    5 5 6 6 1 4 3 9
    5 _ 2 1 1 a _ 9
    5 _ 2 _ 1 a 9 9
  `);
  // expect(() => g.randomCreateShape()).throw();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ 7 7 7
    _ _ _ 8 8 4 _ 7
    _ _ _ 0 _ 4 _ 3
    _ _ 0 0 0 4 3 3
    5 5 6 6 1 4 3 9
    5 _ 2 1 1 a _ 9
    5 _ 2 _ 1 a 9 9
  `);
  g.move(Direction.Left);
  // expect(() => g.randomCreateShape()).throw();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ 7 7 7 _
    8 8 _ _ _ 4 7 _
    _ 0 _ _ _ 4 _ 3
    0 0 0 _ _ 4 3 3
    5 5 6 6 1 4 3 9
    5 2 _ 1 1 a _ 9
    5 2 _ _ 1 a 9 9
  `);
  g.remove();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ 7 7 7 _
    8 8 _ _ _ 4 _ _
    _ 0 _ _ _ 4 _ 3
    0 0 0 _ _ 4 3 3
    _ _ _ _ _ _ _ _
    5 2 _ 1 1 _ _ 9
    5 2 _ _ 1 a 9 9
  `);
  g.move(Direction.Down);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    8 8 _ _ 7 7 7 _
    _ 0 _ _ _ 4 _ 3
    0 0 0 _ _ 4 3 3
    5 2 _ 1 1 4 _ 9
    5 2 _ _ 1 a 9 9
  `);
  g.remove();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    8 8 _ _ 7 7 7 _
    _ 0 _ _ _ 4 _ 3
    0 0 0 _ _ 4 3 3
    5 2 _ 1 1 4 _ 9
    5 2 _ _ 1 a 9 9
  `);
  g.move(Direction.Down);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    8 8 _ _ 7 7 7 _
    _ 0 _ _ _ 4 _ 3
    0 0 0 _ _ 4 3 3
    5 2 _ 1 1 4 _ 9
    5 2 _ _ 1 a 9 9
  `);

})