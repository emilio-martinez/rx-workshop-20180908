import { data$ } from './fixtures/13-data';
import { map, filter, reduce } from 'rxjs/operators';

/** TODO:
  1. Take the odd numbers from the observable `data$`,
  2. Double them (i.e. 1 -> 2, 3 -> 6, etc)
  3. Sum them
  4. Log the result
  5. Try using the pipeable operators from `rxjs/operators`!
*/
// FINAL_START
data$.pipe(
  filter(x => x % 2 === 1),
  map(x => x + x),
  reduce((s, x) => s + x, 0),
).subscribe(result => console.log(result));
// FINAL_END

/**
  NOTE: expected output
  50
*/

//TODO: try replacing `reduce` with `scan`!
