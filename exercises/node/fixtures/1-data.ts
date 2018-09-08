import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

export const data$ = interval(200).pipe(take(10));
