import { ReplaySubject } from 'rxjs';
import { meatspaceSystem, temp$ } from './fixtures/19-meatspace';

/**
  NOTE: setup

  `temp$`             - An observable stream of temperature changes that arrive
                        once every 500ms
  `meatspaceSystem`   - A simulation of users randomly viewing the stream of
                        temperature data. (Not actually random, just simulated)

                        When the callback provided to `meatspaceSystem` is called
                        it is given user object with a `sendTemperature` method
                        and an `onleave` event hook for you to fill out.

                        the `user` object itself writes to console.

  NOTE: All timing is virtualized, so you don't have to wait forever for the
        demo code to run.
*/

/** TODO:
  1. Notify all incoming users of the most recent THREE temperatures.
  2. Be sure the users don't have to wait for the first value.
*/
// FINAL_START
const replaySubject = new ReplaySubject(3);
temp$.subscribe(replaySubject);
// FINAL_END
meatspaceSystem((user) => {
  // TODO: notify users with `user.sendTemperature(temp)`
  // FINAL_START
  const sub = replaySubject.subscribe(temp => user.sendTemperature(temp));
  // FINAL_END

  // `user.onleave` is called when the user stop watching values
  user.onleave = () => {
    // TODO: stop sending temps to the user when they leave
    // FINAL_START
    sub.unsubscribe();
    // FINAL_END
  }
});

/**
  NOTE: expected output

  1100ms (user 1): JOIN
  1100ms (user 1): 67.0°C
  1100ms (user 1): 67.2°C
  1100ms (user 1): 67.3°C
  1500ms (user 1): 67.4°C
  1600ms (user 2): JOIN
  1600ms (user 2): 67.2°C
  1600ms (user 2): 67.3°C
  1600ms (user 2): 67.4°C
  2000ms (user 1): 67.6°C
  2000ms (user 2): 67.6°C
  2500ms (user 1): 67.9°C
  2500ms (user 2): 67.9°C
  3000ms (user 1): 68.0°C
  3000ms (user 2): 68.0°C
  3500ms (user 1): 68.1°C
  3500ms (user 2): 68.1°C
  3700ms (user 3): JOIN
  3700ms (user 3): 67.9°C
  3700ms (user 3): 68.0°C
  3700ms (user 3): 68.1°C
  4000ms (user 1): LEAVING
  4000ms (user 2): 67.0°C
  4000ms (user 3): 67.0°C
  4500ms (user 2): 67.2°C
  4500ms (user 3): 67.2°C
  5000ms (user 2): 67.3°C
  5000ms (user 3): 67.3°C
  5500ms (user 2): 67.4°C
  5500ms (user 3): 67.4°C
  6000ms (user 2): 67.6°C
  6000ms (user 3): 67.6°C
  6500ms (user 2): 67.9°C
  6500ms (user 3): 67.9°C
  6700ms (user 2): LEAVING
  7000ms (user 3): 68.0°C
  7500ms (user 3): 68.1°C
  8000ms (user 3): 67.0°C
  8400ms (user 3): LEAVING
*/
