/* eslint-disable cypress/no-unnecessary-waiting */
/* eslint-disable no-param-reassign */

const text = `
Two households, both alike in dignity
In fair Verona, where we lay our scene,
From ancient grudge break to new mutiny,
Where civil blood makes civil hands unclean.
From forth the fatal loins of these two foes
A pair of star-cross'd lovers take their life;
Whose misadventured piteous overthrows
Do with their death bury their parents' strife.
The fearful passage of their death-mark'd love,
And the continuance of their parents' rage,
Which, but their children's end, nought could remove,
Is now the two hours' traffic of our stage;
The which if you with patient ears attend,
What here shall miss, our toil shall strive to mend.
`.replace(/\n/g, ' ').trim();
const charsPerSecond = 4;

describe('typer', () => {
  it('types text and checks if the content matches', () => {
    // open index page
    cy.visit('/test/multiple-clients/1');

    cy.get('.multi-cursor-text__edit-area').eq(0)
      .clear()
      .type('{enter}{enter}{uparrow}')
      .type(text, { delay: 1000 / charsPerSecond });

    cy.get('.multi-cursor-text__edit-area').eq(0).contains(text);
  });
});
