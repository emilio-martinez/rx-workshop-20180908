import { Resource } from './fixtures/6-Resource';

import { fromEvent } from 'rxjs';
// TODO: create an observable with the `Observable.fromEvent` over the same
// `Resource` we used in exercise 6.

/**
NOTE: `Resource` usage:

const resource = new Resource(); // start the resource;
resource.addEventListener('data', handler); // listen for data events
resource.removeEventListener('data', handler); // stop listening for data events

HINT: You'll probably have to create the `Resource` first.
*/

const resource = new Resource(); // start the resource;
const source$ = fromEvent(resource, 'data');

/**
 * Can take several kinds of event patterns
 * - EventTarget (DOM): addEventListener/removeEventListener
 * - EventEmitter (Node): addListener/removeListener
 * - JQuery/Node-style: on/off
 */

/**
 * Important difference vs exercise 6:
 * Here, the resource exists outside of the observable creation, which is known as Hot.
 * Exercise 6 is an example of a Cold observable because the producer is only created until you subscribe.
 */

const subscription = source$.subscribe(
  x => console.log(x),
  err => console.error(err),
  () => console.info('done')
);

setTimeout(() => subscription.unsubscribe(), 2000);

/**
NOTE: output should be:

Resource: started
Resource: event listener added
0
1
2
3
Resource: event listener removed
Resource: closed
*/
