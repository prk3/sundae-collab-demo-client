/// <reference types="cypress" />

// SOURCE: https://gist.github.com/yagudaev/2ad1ef4a21a2d1cfe0e7d96afc7170bc

// Cypress 3.3.1 and below do not support listening to the fetch method
// Therefore, as a workaround we polyfill `fetch` with traditional XHR which
// are supported. See: https://github.com/cypress-io/cypress/issues/687
enableFetchWorkaround();

function enableFetchWorkaround() {
  let polyfill;

  before(() => {
    console.info('Load fetch XHR polyfill');
    cy.readFile('./cypress/support/polyfills/fetch.umd.js').then(content => {
      polyfill = content;
    });
  });

  Cypress.on('window:before:load', window => {
    delete window.fetch;
    // since the application code does not ship with a polyfill
    // load a polyfilled "fetch" from the test
    window.eval(polyfill);

    const send = window.WebSocket.prototype.send;

    window.webSocketCollect = () => {
      window.webSocketQueue = [];
      window.WebSocket.prototype.send = function () {
        window.webSocketQueue.push([this, arguments]);
      };
    };

    window.webSocketRelease = () => {
      window.webSocketQueue.forEach(([socket, args]) => {
        send.apply(socket, args);
      });
      delete window.webSocketQueue;
      window.WebSocket.prototype.send = send;
    };
  });
}
