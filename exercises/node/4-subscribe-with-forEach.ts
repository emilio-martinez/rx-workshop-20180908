// `data$` is an observable stream of 10 numbers.
import { data$ } from './fixtures/1-data';

// TODO: Subscribe to `data$` and log out all values to console.

(async () => {
  console.log('START');

  await data$.forEach(v => console.log(v))
    .then(
      () => console.log('done'),
      err => console.error(err)
    );

  console.log('START');
})();

// NOTE: If `forEach` returns a promise, how an we unsubscribe?
//   We can't (yet! perhaps in the future of Rx?)
