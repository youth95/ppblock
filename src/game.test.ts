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
    _ _ _ _ 1 1 _ _
    _ _ _ _ 1 1 _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    0 0 0 0 _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ 1 1 _ _
    _ _ _ _ 1 1 _ _
    _ _ _ 2 _ _ _ _
    _ _ 2 2 2 _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    0 0 0 0 _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ 1 1 3 _
    _ _ _ _ 1 1 3 _
    _ _ _ 2 _ 3 3 _
    _ _ 2 2 2 _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    0 0 0 0 _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ 1 1 3 _
    _ _ _ _ 1 1 3 _
    _ _ _ 2 _ 3 3 _
    _ _ 2 2 2 _ _ _
    _ _ _ _ _ _ _ _
    _ 4 4 _ _ _ _ _
    _ 4 4 _ _ _ _ _
    0 0 0 0 _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ 1 1 3 _
    _ _ _ _ 1 1 3 _
    _ _ _ 2 _ 3 3 _
    _ _ 2 2 2 5 _ _
    _ _ _ _ _ 5 5 5
    _ 4 4 _ _ _ _ _
    _ 4 4 _ _ _ _ _
    0 0 0 0 _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ 1 1 3 _
    _ _ _ _ 1 1 3 _
    _ _ _ 2 _ 3 3 _
    _ _ 2 2 2 5 _ _
    _ _ _ _ _ 5 5 5
    _ 4 4 _ _ _ _ _
    _ 4 4 _ _ 6 _ _
    0 0 0 0 _ 6 6 6
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ 1 1 3 _
    _ _ _ _ 1 1 3 _
    _ 7 7 2 _ 3 3 _
    _ 7 2 2 2 5 _ _
    _ 7 _ _ _ 5 5 5
    _ 4 4 _ _ _ _ _
    _ 4 4 _ _ 6 _ _
    0 0 0 0 _ 6 6 6
  `);
  g.move(Direction.Down);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ 1 1 3 _
    _ 7 7 _ 1 1 3 _
    _ 7 _ 2 _ 3 3 _
    _ 7 2 2 2 5 _ _
    _ 4 4 _ _ 5 5 5
    _ 4 4 _ _ 6 _ _
    0 0 0 0 _ 6 6 6
  `);
  g.move(Direction.Right);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ 1 1 3
    _ 7 7 _ _ 1 1 3
    _ 7 _ 2 _ _ 3 3
    _ 7 2 2 2 5 _ _
    _ _ _ 4 4 5 5 5
    _ _ _ 4 4 6 _ _
    _ 0 0 0 0 6 6 6
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ 1 1 3
    _ 7 7 _ _ 1 1 3
    _ 7 _ 2 _ _ 3 3
    _ 7 2 2 2 5 _ _
    8 _ _ 4 4 5 5 5
    8 8 _ 4 4 6 _ _
    8 0 0 0 0 6 6 6
  `);
  g.move(Direction.Top);
  expect(g).toMatchInlineSnapshot(`
    _ 7 7 2 _ 1 1 3
    _ 7 2 2 2 1 1 3
    8 7 _ 4 4 5 3 3
    8 8 _ 4 4 5 5 5
    8 0 0 0 0 6 _ _
    _ _ _ _ _ 6 6 6
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ 7 7 2 _ 1 1 3
    _ 7 2 2 2 1 1 3
    8 7 _ 4 4 5 3 3
    8 8 _ 4 4 5 5 5
    8 0 0 0 0 6 _ _
    _ _ _ 9 9 6 6 6
    _ _ _ 9 _ _ _ _
    _ _ _ 9 _ _ _ _
  `);
  g.move(Direction.Top);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ 7 7 2 _ 1 1 3
    _ 7 2 2 2 1 1 3
    8 7 _ 4 4 5 3 3
    8 8 _ 4 4 5 5 5
    8 0 0 0 0 6 _ _
    _ a _ 9 9 6 6 6
    _ a a 9 _ _ _ _
    _ a _ 9 _ _ _ _
  `);
  g.move(Direction.Down);
  expect(g).toMatchInlineSnapshot(`
    _ 7 7 2 _ _ _ _
    _ 7 2 2 2 _ _ _
    8 7 _ 4 4 1 1 3
    8 8 _ 4 4 1 1 3
    8 0 0 0 0 5 3 3
    _ a _ 9 9 5 5 5
    _ a a 9 _ 6 _ _
    _ a _ 9 _ 6 6 6
  `);
  expect(() => g.randomCreateShape()).throw();
  expect(g).toMatchInlineSnapshot(`
    _ 7 7 2 _ _ _ _
    _ 7 2 2 2 _ _ _
    8 7 _ 4 4 1 1 3
    8 8 _ 4 4 1 1 3
    8 0 0 0 0 5 3 3
    _ a _ 9 9 5 5 5
    _ a a 9 _ 6 _ _
    _ a _ 9 _ 6 6 6
  `);
  g.move(Direction.Left);
  expect(() => g.randomCreateShape()).throw();
  expect(g).toMatchInlineSnapshot(`
    _ 7 7 2 _ _ _ _
    _ 7 2 2 2 _ _ _
    8 7 4 4 1 1 _ 3
    8 8 4 4 1 1 _ 3
    8 0 0 0 0 5 3 3
    a _ 9 9 _ 5 5 5
    a a 9 6 _ _ _ _
    a _ 9 6 6 6 _ _
  `);
  g.remove();
  expect(g).toMatchInlineSnapshot(`
    _ 7 _ _ _ _ _ _
    _ 7 _ _ 2 _ _ _
    8 7 _ _ 1 1 _ 3
    8 8 _ _ 1 1 _ 3
    _ _ _ _ _ _ _ _
    a _ _ _ _ 5 5 5
    a a _ _ _ _ _ _
    a _ _ _ 6 6 _ _
  `);
  g.move(Direction.Down);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ 7 _ _ _ _ _ _
    _ 7 _ _ _ _ _ _
    8 7 _ _ 2 _ _ _
    8 8 _ _ 1 1 _ 3
    a _ _ _ 1 1 _ 3
    a a _ _ _ 5 5 5
    a _ _ _ 6 6 _ _
  `);
  g.remove();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ 7 _ _ _ _ _ _
    _ 7 _ _ _ _ _ _
    8 7 _ _ 2 _ _ _
    8 8 _ _ 1 1 _ 3
    a _ _ _ 1 1 _ 3
    a a _ _ _ 5 5 5
    a _ _ _ 6 6 _ _
  `);
  g.move(Direction.Down);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ 7 _ _ _ _ _ _
    _ 7 _ _ _ _ _ _
    8 7 _ _ 2 _ _ _
    8 8 _ _ 1 1 _ 3
    a _ _ _ 1 1 _ 3
    a a _ _ _ 5 5 5
    a _ _ _ 6 6 _ _
  `);

})