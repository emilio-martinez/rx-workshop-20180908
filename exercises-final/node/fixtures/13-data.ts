import { interval } from 'rxjs';
import { take } from 'rxjs/operators';

export const data$ = interval(50).pipe(take(10));
