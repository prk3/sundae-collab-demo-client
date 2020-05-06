/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable no-param-reassign */

// const url = (u) => `${Cypress.config().baseUrl}${u}`;

describe('concurrent editing', () => {
  it('merges concurrent string edits correctly', () => {
    // open index page
    cy.visit('/test/multiple-clients/2');

    cy.get('.multi-cursor-text__edit-area').eq(0).type('{selectAll}one {enter}two {enter}three {enter}');
    cy.wait(500); // wait until text areas synchronize

    cy.window().then((w) => w.webSocketCollect());

    cy.get('.multi-cursor-text__edit-area').eq(0).type(
      '{uparrow}{uparrow}{uparrow}{end}orange',
      { delay: 10 },
    );
    cy.get('.multi-cursor-text__edit-area').eq(1).type(
      '{uparrow}{uparrow}{uparrow}{downarrow}{end}bananas',
      { delay: 10 },
    );

    cy.wait(500); // wait a little to show the disparity
    cy.window().then((w) => w.webSocketRelease());

    cy.get('[data-cy="editor"]').eq(0).within(() => {
      cy.get('.multi-cursor-text__edit-area').should('have.value', 'one orange\ntwo bananas\nthree \n');
    });
    cy.get('[data-cy="editor"]').eq(1).within(() => {
      cy.get('.multi-cursor-text__edit-area').should('have.value', 'one orange\ntwo bananas\nthree \n');
    });
  });
});
