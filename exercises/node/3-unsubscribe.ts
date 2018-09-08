// `data$` is an observable stream of 10 numbers.
import { data$ } from './fixtures/1-data';

// TODO: Get the subscription and unsubscribe it after 1 second

const subscription = data$.subscribe({
  next(v) { console.log(v) },
  complete() { console.log('done') }
})

setTimeout(() => {
  console.log('1 second passed, goodbye');
  subscription.unsubscribe();
}, 1000)