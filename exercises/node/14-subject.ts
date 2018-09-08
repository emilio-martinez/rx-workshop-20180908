import { Subject } from 'rxjs';
import { createLoggingObserver } from './helpers/createLoggingObserver';

const observerA = createLoggingObserver('A');
const observerB = createLoggingObserver('B');

// TODO: Create and subscribe to a subject with `observerA` and `observerB`
// TODO: synchronously notify the subject with values 1, 2, 3 via `next` and `complete`
// TODO: Try nexting after complete.
// TODO: Try the same thing with `subject.error()` instead of complete

const subscriber = new Subject();
subscriber.subscribe(observerA);
subscriber.subscribe(observerB);

subscriber.next(1);
subscriber.next(2);
subscriber.next(3);
subscriber.complete();
subscriber.next(4);

/**
  NOTE: expected output
  A 1
  B 1
  A 2
  B 2
  A 3
  B 3
  A done
  B done
*/
