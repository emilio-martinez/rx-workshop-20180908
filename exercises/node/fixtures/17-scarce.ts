import { Observable, interval } from 'rxjs';
import { take } from 'rxjs/operators';

let active = false;

export const scarce$ = new Observable(observer => {
  if (!active) {
    active = true;
    return interval(100).pipe(
      take(20)
    ).subscribe(observer);
  } else {
    throw new Error('scarce$ is already active!');
  }
});
