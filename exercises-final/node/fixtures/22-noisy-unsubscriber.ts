import { Observable, interval } from 'rxjs';
import { map } from 'rxjs/operators';

export function noisyUnsubscriber(name) {
  return new Observable(observer => {
    const sub = interval(200).pipe(
      map(n => `${name}: ${n}`)
    ).subscribe(observer);
    return () => {
      sub.unsubscribe();
      console.log(`${name} unsubscribed`);
    };
  });
};
