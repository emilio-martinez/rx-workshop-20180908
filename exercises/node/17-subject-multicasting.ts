import { Subject, ConnectableObservable } from 'rxjs';
import { filter, publish, refCount, multicast, share } from 'rxjs/operators';
import { scarce$ } from './fixtures/17-scarce';
import { createLoggingObserver } from './helpers/createLoggingObserver';

const fizzObserver = createLoggingObserver('fizz');
const buzzObserver = createLoggingObserver('buzz');
const fizzbuzzObserver = createLoggingObserver('fizzbuzz');

/** TODO:
  `scarce$` will error if you subscribe to it more than once!!
  1. Notify `fizzObserver` of all values from `scarce$` divisible by 3.
  2. Notify `buzzObserver` of all values from `scarce$` divisible by 5.
  3. Notify `fizzbuzzObserver` of all values from `scarce$` divisible by 3 AND 5.
*/

const divisibleBy = (num: number) => filter((v: number) => (v % num === 0));

// const subject = new Subject<number>();
// subject.pipe(divisibleBy(3)).subscribe(fizzObserver);
// subject.pipe(divisibleBy(5)).subscribe(buzzObserver);
// subject.pipe(divisibleBy(3 * 5)).subscribe(fizzbuzzObserver);
// scarce$.subscribe(subject);


// OR

/**
 * Use publish to multicast via a Subject automatically and have it unsubscribe via refCount
 *
 * publish === multicast(subject) + ConnectableObservable.connect()
 * refCount unsubscribes when the subscription count goes down to zero
 */

// const shared$ = scarce$.pipe(publish(), refCount());
// shared$.pipe(divisibleBy(3)).subscribe(fizzObserver);
// shared$.pipe(divisibleBy(5)).subscribe(buzzObserver);
// shared$.pipe(divisibleBy(3 * 5)).subscribe(fizzbuzzObserver);

// OR

/**
 * Use share()
 *
 * share === publish() + refCount()
 */

const shared$ = scarce$.pipe(share());
shared$.pipe(divisibleBy(3)).subscribe(fizzObserver);
shared$.pipe(divisibleBy(5)).subscribe(buzzObserver);
shared$.pipe(divisibleBy(3 * 5)).subscribe(fizzbuzzObserver);

/**
  NOTE: expected output
  fizz 0
  buzz 0
  fizzbuzz 0
  fizz 3
  buzz 5
  fizz 6
  fizz 9
  buzz 10
  fizz 12
  fizz 15
  buzz 15
  fizzbuzz 15
  fizz 18
  fizz done
  buzz done
  fizzbuzz done
*/
