import { data$ } from './fixtures/13-data';
import { map, filter, reduce, scan } from 'rxjs/operators';

/** TODO:
  1. Take the odd numbers from the observable `data$`,
  2. Double them (i.e. 1 -> 2, 3 -> 6, etc)
  3. Sum them
  4. Log the result
  5. Try using the pipeable operators from `rxjs/operators`!
*/

data$.pipe(
  filter(v => v % 2 !== 0),
  map(v => (v * 2)),
  reduce((acc, v) => (acc + v), 0)
)
.subscribe(v => console.log(`After reduce: ${v}`))

/**
  NOTE: expected output
  50
*/

//TODO: try replacing `reduce` with `scan`!

data$.pipe(
  filter(v => v % 2 !== 0),
  map(v => (v * 2)),
  scan((acc, v) => (acc + v), 0)
)
.subscribe(v => console.log(`After scan: ${v}`))