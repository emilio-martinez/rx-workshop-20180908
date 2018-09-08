// `data$` is an observable stream of 10 numbers.
import { data$ } from './fixtures/1-data';

// TODO: create an observer to subscribe to `data$` and log out all values.

// Sometimes better for legibility
data$.subscribe({
  next: (v) => console.log(v),
  error: (err) => console.error(err),
  complete: () => console.log('done')
});

// Also, easier to use less
data$.subscribe({
  complete: () => console.log('done')
});