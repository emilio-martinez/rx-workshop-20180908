import { timer, merge, VirtualTimeScheduler, ConnectableObservable } from 'rxjs';
import { zip, publish, map } from 'rxjs/operators';

const virtualScheduler = new VirtualTimeScheduler();

export const temp$ = timer(0, 500, virtualScheduler).pipe(
  zip(
    [
      67.0, 67.2, 67.3, 67.4, 67.6, 67.9, 68.0, 68.1,
      67.0, 67.2, 67.3, 67.4, 67.6, 67.9, 68.0, 68.1,
      67.0, 67.2, 67.3, 67.4, 67.6, 67.9, 68.0, 68.1,
      67.0, 67.2, 67.3, 67.4, 67.6, 67.9, 68.0, 68.1,
    ],
    (_, t) => t
  ),
  publish(),
) as ConnectableObservable<number>;

temp$.connect();

let userId = 1;

class User {
  id: number;

  onleave: () => void;
  
  constructor(listenDuration) {
    this.id = userId++;
    this.log('JOIN');
    timer(listenDuration, virtualScheduler)
      .subscribe(() => this.leave());
  }

  sendTemperature(temp) {
    this.log(temp.toFixed(1) + '°C');
  }

  leave() {
    this.log('LEAVING');
    if (this.onleave) {
      this.onleave();
    }
  }

  log(msg: string) {
    const { id } = this;
    const frame = virtualScheduler.now();
    console.log(`${frame}ms (user ${id}): ${msg}`)
  }
}

function toUserThatLeavesAt(ms: number) {
  return map(() => new User(ms));
}

export function meatspaceSystem(callback: (user: User) => void) {
  merge(
    timer(1100, virtualScheduler).pipe(toUserThatLeavesAt(2900)),
    timer(1600, virtualScheduler).pipe(toUserThatLeavesAt(5100)),
    timer(3700, virtualScheduler).pipe(toUserThatLeavesAt(4700))
  )
  .subscribe(
    user => callback(user)
  );

  virtualScheduler.flush();
}
