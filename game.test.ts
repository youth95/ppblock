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

test('move case 3', () => {
  const g = new Game('random');
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ 1 1 _ _
    _ _ _ _ 1 1 _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ 0 0 _ _ _ _ _
    _ 0 _ _ _ _ _ _
    _ 0 _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ 1 1 _ _
    _ _ _ _ 1 1 _ _
    2 2 _ _ _ _ _ _
    2 2 _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ 0 0 _ _ _ _ _
    _ 0 _ _ _ _ _ _
    _ 0 _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ 1 1 _ _
    _ _ _ _ 1 1 _ _
    2 2 3 3 3 3 _ _
    2 2 _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ 0 0 _ _ _ _ _
    _ 0 _ _ _ _ _ _
    _ 0 _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ 1 1 _ _
    _ _ _ _ 1 1 _ _
    2 2 3 3 3 3 _ _
    2 2 _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ 0 0 _ 4 4 _ _
    _ 0 _ _ 4 4 _ _
    _ 0 _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ 1 1 _ _
    _ _ _ _ 1 1 _ _
    2 2 3 3 3 3 _ _
    2 2 _ 5 _ _ _ _
    _ _ 5 5 5 _ _ _
    _ 0 0 _ 4 4 _ _
    _ 0 _ _ 4 4 _ _
    _ 0 _ _ _ _ _ _
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ 1 1 _ _
    _ _ _ _ 1 1 _ _
    2 2 3 3 3 3 _ _
    2 2 _ 5 _ _ _ _
    _ _ 5 5 5 _ _ _
    _ 0 0 _ 4 4 _ _
    _ 0 _ _ 4 4 _ _
    _ 0 _ _ 6 6 6 6
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ 1 1 _ _
    _ _ _ _ 1 1 _ _
    2 2 3 3 3 3 7 _
    2 2 _ 5 _ 7 7 7
    _ _ 5 5 5 _ _ _
    _ 0 0 _ 4 4 _ _
    _ 0 _ _ 4 4 _ _
    _ 0 _ _ 6 6 6 6
  `);
  g.move(Direction.Down);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ 1 1 _ _
    _ _ _ _ 1 1 _ _
    _ _ 3 3 3 3 _ _
    2 2 _ 5 _ _ 7 _
    2 2 5 5 5 7 7 7
    _ 0 0 _ 4 4 _ _
    _ 0 _ _ 4 4 _ _
    _ 0 _ _ 6 6 6 6
  `);
  g.move(Direction.Right);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ 1 1
    _ _ _ _ _ _ 1 1
    _ _ _ _ 3 3 3 3
    2 2 _ 5 _ _ 7 _
    2 2 5 5 5 7 7 7
    _ _ _ 0 0 _ 4 4
    _ _ _ 0 _ _ 4 4
    _ _ _ 0 6 6 6 6
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ 1 1
    _ _ _ _ _ _ 1 1
    _ _ _ _ 3 3 3 3
    2 2 _ 5 _ _ 7 _
    2 2 5 5 5 7 7 7
    _ 8 8 0 0 _ 4 4
    _ 8 _ 0 _ _ 4 4
    _ 8 _ 0 6 6 6 6
  `);
  g.move(Direction.Top);
  expect(g).toMatchInlineSnapshot(`
    2 2 _ _ _ _ 1 1
    2 2 _ _ _ _ 1 1
    _ _ _ 5 3 3 3 3
    _ _ 5 5 5 _ 7 _
    _ 8 8 0 0 7 7 7
    _ 8 _ 0 _ _ 4 4
    _ 8 _ 0 _ _ 4 4
    _ _ _ _ 6 6 6 6
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    2 2 _ _ _ _ 1 1
    2 2 _ _ _ _ 1 1
    _ _ _ 5 3 3 3 3
    _ _ 5 5 5 _ 7 _
    _ 8 8 0 0 7 7 7
    _ 8 _ 0 _ _ 4 4
    _ 8 9 0 _ _ 4 4
    _ 9 9 9 6 6 6 6
  `);
  g.move(Direction.Top);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    2 2 _ _ _ _ 1 1
    2 2 _ _ _ _ 1 1
    _ _ _ 5 3 3 3 3
    a a 5 5 5 _ 7 _
    a 8 8 0 0 7 7 7
    a 8 _ 0 _ _ 4 4
    _ 8 9 0 _ _ 4 4
    _ 9 9 9 6 6 6 6
  `);
  g.move(Direction.Down);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ 1 1
    2 2 _ _ _ _ 1 1
    2 2 _ 5 3 3 3 3
    a a 5 5 5 _ 7 _
    a 8 8 0 0 7 7 7
    a 8 _ 0 _ _ 4 4
    _ 8 9 0 _ _ 4 4
    _ 9 9 9 6 6 6 6
  `);
  g.randomCreateShape();
  expect(g).toMatchInlineSnapshot(`
    b b b b _ _ 1 1
    2 2 _ _ _ _ 1 1
    2 2 _ 5 3 3 3 3
    a a 5 5 5 _ 7 _
    a 8 8 0 0 7 7 7
    a 8 _ 0 _ _ 4 4
    _ 8 9 0 _ _ 4 4
    _ 9 9 9 6 6 6 6
  `);
  g.move(Direction.Left);
  expect(() => g.randomCreateShape()).throw();
  expect(g).toMatchInlineSnapshot(`
    b b b b 1 1 _ _
    2 2 _ _ 1 1 _ _
    2 2 _ 5 3 3 3 3
    a a 5 5 5 _ 7 _
    a 8 8 0 0 7 7 7
    a 8 _ 0 4 4 _ _
    _ 8 9 0 4 4 _ _
    _ 9 9 9 6 6 6 6
  `);
  g.remove();
  expect(g).toMatchInlineSnapshot(`
    b _ d d _ 1 _ _
    2 _ _ _ _ 1 _ _
    2 _ _ 5 _ 3 3 3
    a _ 5 5 _ _ 7 _
    _ _ _ _ _ _ _ _
    e _ _ 0 _ 4 _ _
    _ _ 9 0 _ 4 _ _
    _ _ 9 9 _ 6 6 6
  `);
  g.move(Direction.Down);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ d d _ 1 _ _
    b _ _ 5 _ 1 _ _
    2 _ 5 5 _ 3 3 3
    2 _ _ 0 _ 4 _ _
    a _ 9 0 _ 4 7 _
    e _ 9 9 _ 6 6 6
  `);
  g.remove();
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ d d _ 1 _ _
    b _ _ 5 _ 1 _ _
    2 _ 5 5 _ 3 3 3
    2 _ _ 0 _ 4 _ _
    a _ 9 0 _ 4 7 _
    e _ 9 9 _ 6 6 6
  `);
  g.move(Direction.Down);
  expect(g).toMatchInlineSnapshot(`
    _ _ _ _ _ _ _ _
    _ _ _ _ _ _ _ _
    _ _ d d _ 1 _ _
    b _ _ 5 _ 1 _ _
    2 _ 5 5 _ 3 3 3
    2 _ _ 0 _ 4 _ _
    a _ 9 0 _ 4 7 _
    e _ 9 9 _ 6 6 6
  `);

})