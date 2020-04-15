/// <reference types="cypress" />

const url = (u) => `${Cypress.config().baseUrl}${u}`;
const api = (a) => `http://localhost:8000${a}`;

describe('recipes', () => {
  it('can visit index page', () => {
    // spy on index requests
    cy.server();
    cy.route('GET', api('/recipes')).as('index');

    // open index page
    cy.visit('/');
    cy.url().should('eq', url('/recipes'));

    // check if client received recipe index
    cy.wait('@index').its('status').should('eq', 200);
  });

  it('can visit add page', () => {
    // open recipes page
    cy.visit('/');

    // click add button, check url
    cy.get('[data-cy="recipe-add"]').click({ force: true });
    cy.url().should('eq', url('/recipes/add'));
  });

  it('can cancel recipe creation', () => {
    // open recipe add page
    cy.visit('/');
    cy.visit('/recipes/add');

    // cancel addition, check url
    cy.get('[data-cy="recipe-cancel"]').click({ force: true });
    cy.url().should('eq', url('/recipes'));
  });

  it('can add a recipe', () => {
    // spy on recipe creation requests
    cy.server();
    cy.route('POST', api('/recipes')).as('create');

    // open add recipe page
    cy.visit('/');
    cy.visit('/recipes/add');

    // generate random name
    const name = `add test ${Math.floor(Math.random() * 10000)}`;

    // fill in the form
    cy.get('[data-cy="recipe-name"]').clear().type(name);
    cy.get('[data-cy="recipe-description"]').clear().type(`this is an awesome description of ${name}!`);
    cy.get('[data-cy="recipe-type"]').select('drink');
    cy.get('[data-cy-label="Preparation time"] button').eq(1).click().click();
    cy.get('[data-cy="recipe-alcohol"]').check();

    // submit form, check creation response
    cy.get('[data-cy="recipe-add"]').click({ force: true });
    cy.wait('@create').its('status').should('eq', 201);

    // should be on recipes page, a recipe with that name exists
    cy.url().should('eq', url('/recipes'));
    cy.get('h2').contains(name).should('exist');
  });

  it('can add and edit recipe', () => {
    // spy on update requests
    cy.server();
    cy.route('PUT', api('/recipes/*')).as('update');

    // open recipe add page
    cy.visit('/');
    cy.visit('/recipes/add');

    // generate random name
    const randomId = Math.floor(Math.random() * 10000);
    const name = `edit test ${randomId}`;
    const desc = `this is an awesome description of ${name}!`;

    // fill in the recipe form
    cy.get('[data-cy="recipe-name"]').clear().type(name);
    cy.get('[data-cy="recipe-description"]').clear().type(desc);
    cy.get('[data-cy="recipe-type"]').select('appetizer');
    cy.get('[data-cy-label="Preparation time"] button').eq(0).click();
    cy.get('[data-cy="recipe-alcohol"]').check();

    // submit add form, check if on index page
    cy.get('[data-cy="recipe-add"]').click({ force: true });
    cy.url().should('eq', url('/recipes'));

    // find new recipe, click it's edit button
    cy.contains(name)
      .parents('[data-cy="recipe"]')
      .find('[data-cy="recipe-edit"]')
      .click({ force: true });

    const nameModified = `edited test ${randomId}`;
    const descModified = `this is an edited description of ${nameModified}`;

    // check form input values
    cy.get('[data-cy-label="Name"] textarea').should('have.value', name);
    cy.get('[data-cy-label="Description"] textarea').should('have.value', desc);
    cy.get('[data-cy="recipe-type"]').should('have.value', 'appetizer');
    cy.get('[data-cy-label="Preparation time"] span').contains('55');
    cy.get('[data-cy="recipe-alcohol"]').should('have.checked', true);

    // update values
    cy.get('[data-cy-label="Name"] textarea').clear().type(nameModified);
    cy.get('[data-cy-label="Description"] textarea').clear().type(descModified);
    cy.get('[data-cy="recipe-type"]').select('soup');
    cy.get('[data-cy-label="Preparation time"] button').eq(1).click().click();
    cy.get('[data-cy="recipe-alcohol"]').uncheck();

    // submit edit form, should see recipes page again
    cy.get('[data-cy="recipe-save"]').click({ force: true });
    cy.url().should('eq', url('/recipes'));

    // update request was send and returned correct code
    cy.wait('@update').its('status').should('eq', 200);

    // old model was replaced
    cy.get('h2').contains(nameModified).should('exist');
    cy.get('h2').contains(name).should('not.exist');
  });

  it('can add and delete recipe', () => {
    // spy on delete requests
    cy.server();
    cy.route('DELETE', api('/recipes/*')).as('delete');

    // open recipe add page
    cy.visit('/');
    cy.visit('/recipes/add');

    // generate random name
    const name = `del test ${Math.floor(Math.random() * 10000)}`;

    // fill in the recipe form
    cy.get('[data-cy="recipe-name"]').type(name);
    cy.get('[data-cy="recipe-description"]').type(`this is an awesome description of ${name}!`);

    // submit recipe add form, check if on index page
    cy.get('[data-cy="recipe-add"]').click({ force: true });
    cy.url().should('eq', url('/recipes'));

    // find recipe with that name, click delete button
    cy.contains(name)
      .parents('[data-cy="recipe"]')
      .find('[data-cy="recipe-delete"]')
      .click({ force: true });

    cy.wait('@delete').its('status').should('eq', 204);

    cy.get('h2').contains(name).should('not.exist');
  });
});
