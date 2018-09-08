import { from } from 'rxjs';

const promise = Promise.resolve('still useful!');

// TODO: create an observable the Promise using `Observable.from`
// FINAL_START
const source$ = from(promise);
// FINAL_END

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
  stop
  still useful!
  done
*/

// Notice the output is _asynchronous_, because promises are an async value
