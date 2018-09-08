(function () {
  // NOTE: Setup ---------------------------------------------
  const { fromEvent, Observable, timer } = rxjs;
  const { debounceTime, map, switchMap, tap, retryWhen, filter } = rxjs.operators;
  const { ajax } = rxjs.ajax;
  const { WebSocketSubject } = rxjs.webSocket;

  // the div containing the search suggestion results
  const suggestions = document.querySelector('#suggestions');

  // the div containing the selected tickers
  const tickers = document.querySelector('#tickers');

  // the search input element
  const q = document.querySelector('#q');

  // a function to get the search results URL
  const getSearchURL = (query) => `/search?q=${query}`;
  // ---------------------------------------------------------

  /**
      TODO: create an subscribe to an observable that does the
            look ahead search

      NOTE: You don't have to keep the subscription to it, as it will
            be active for the life of this application.
  */

  fromEvent(q, 'input')
    .pipe(
      debounceTime(300),
      switchMap(() => {
        return ajax.getJSON(getSearchURL(q.value))
      })
    ).subscribe(showSuggestions)

  // TODO: setup a WebSocketSubject
  const socket = new WebSocketSubject('ws://localhost:8080');

  const retryTime = (time) => retryWhen(switchMap(() => timer(time)));

  function getTickerStream(symbol) {
    return socket.multiplex(
      () => ({ type: 'sub', symbol }),
      () => ({ type: 'unsub', symbol }),
      v => v.symbol === symbol
    )
    .pipe(
      map(v => v.price),
      retryTime(1000)
    );

    // return new Observable(subscriber => {
    //   socket.next({ type: 'sub', symbol });

    //   console.log('dmsakl');
    //   const subscription = socket.pipe(
    //     filter(v => v.symbol === symbol)
    //   ).subscribe(subscriber);

    //   return () => {
    //     console.log('dada');
    //     socket.next({ type: 'unsub', symbol });
    //     subscription.unsubscribe();
    //   }
    // })
    // .pipe(
    //   map(v => v.price),
    //   retryTime(1000)
    // );
  };

  // ***************************************************************************
  // ***************************************************************************
  // ***************************************************************************
  // Hacky render code past here. Just for demoing purposes. Not best practice!
  // ***************************************************************************
  // ***************************************************************************
  // ***************************************************************************

  function showSuggestions(results) {
    let html = '<ul>';
    results.forEach(({ symbol, name }) => {
      html += `<li>
        <a href="javascript:selectSymbol('${symbol}')">
          ${symbol} - ${name}
        </a>
      </li>`;
    })
    html += '</ul>';

    suggestions.innerHTML = html;
    return html;
  };

  // a hook that is called when a symbol is selected from the suggestions.
  function selectSymbol(symbol) {
    addTicker(symbol);
    suggestions.innerHTML = '';
  };

  function addTicker(symbol) {
    const id = 'ticker-' + symbol;
    if (document.querySelector('#' + id)) {
      return;
    }
    const ticker = document.createElement('x-ticker-display');
    ticker.id = id;
    ticker.title = symbol;
    ticker.data = getTickerStream(symbol);
    tickers.appendChild(ticker);
  };

  window.selectSymbol = selectSymbol;
} ());
