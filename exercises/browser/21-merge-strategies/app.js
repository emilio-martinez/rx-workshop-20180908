(function () {
  const drop = document.querySelector('#drop');
  const dropped = document.querySelector('#dropped');
  const completed = document.querySelector('#completed');
  const svg  = document.querySelector('svg');

  const { Observable, fromEvent } = rxjs;
  const {
    concat,
    concatAll,
    concatMap,
    map,
    mergeAll,
    mergeMap,
    scan,
    startWith,
    switchAll,
    switchMap,
    tap
  } = rxjs.operators;

  const dropClick$ = fromEvent(drop, 'click');

  /**
    TODO: part 1
    1. Use `addBall` and a merging strategy to add an animated ball to the svg element
       for each click of the `drop` button as soon as the `drop` button is clicked.
    2. Increment the value displayed in `dropped` for each ball dropped.
    3. Increment the value displayed in `completed` for each ball animation completed

    TODO: part 2
    4. Change merging strategies so only one animated ball is added at a time,
       But all requested balls complete their animation. Effectively, you'll be
       queueing up animations for each click to `drop`.

    TODO: part3
    5. Change merging strategies so only one animated ball may be added at a time,
       and subsequent requests cancel the currently animating ball.

    TODO: BONUS - Try different source other than button clicks to start your
                  Ball animations!

    NOTE: Balls can be added with the `addBall` function found in global scope.

    `addBall` API:

    addBall(svg: SVGElement): Observable<BallAnimationEvent>

      - returns an Observable that adds a bouncing SVGCircleElement to the passed
        SVGElement. The values emitted are BallAnimationEvents such that:

        interface BallAnimationEvent {
          t: number; // completion ratio between 0 and 1
          x: number; // x pixel position
          y: number; // y pixel position
        }
  */

dropClick$.pipe(
    mergeMap(() =>
      addBall(svg).pipe(
        map(() => ({ type: 'BALL_DROP_MOVE' })),
        startWith({ type: 'BALL_DROP_START' }),
        concat([{ type: 'BALL_DROP_END' }]),
      )
    ),
    scan((state, { type }) => {
      switch (type) {
        case 'BALL_DROP_START':
          return { ...state, dropped: state.dropped + 1 };
        case 'BALL_DROP_END':
          return { ...state, completed: state.completed + 1 };
      }
      return { ...state }
    }, {
      dropped: 0,
      completed: 0
    }),
  ).subscribe(state => {
    dropped.textContent = state.dropped;
    completed.textContent = state.completed;
  });
}());
