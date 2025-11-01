const urls = {
	homePage: 'https://qamid.tmweb.ru/client/index.php',
	adminPage: 'https://qamid.tmweb.ru/admin/',
};

Cypress.Commands.add('openHomePage', () => {
	cy.visit(urls.homePage);
});

Cypress.Commands.add('openAdminPage', () => {
	cy.visit(urls.adminPage);
});

Cypress.Commands.add('loginToAdmin', (user, selectors) => {
	cy.get(selectors.emailInput).type(user.email);
	cy.get(selectors.passwordInput).type(user.password);
	cy.get(selectors.loginButton).click();
});

Cypress.Commands.add('checkMovieVisibility', (movieTitle, movieSelector, movieTitleSelector) => {
	cy.get(movieSelector).should('have.length.greaterThan', 0);
	cy.contains(movieSelector, movieTitle).should('be.visible');
});

Cypress.Commands.add('selectMovieByTitle', (title) => {
	cy.get('.movie').contains('h2', title).click();
});