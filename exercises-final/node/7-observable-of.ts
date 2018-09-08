import { of } from 'rxjs';

// TODO: create an observable of 'foo', 'bar' and 'baz' with `Observable.of`

const source$ = of('foo', 'bar', 'baz');

console.log('start');
source$.subscribe(
  x => console.log(x),
  err => console.error(err),
  () => console.info('done')
);
console.log('stop');

/**
  NOTE: expected output
  start
  foo
  bar
  baz
  done
  stop
*/

// Notice the output is _synchronous_!!
