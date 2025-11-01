const data = require('../fixtures/example.json');

describe('home page', () => {
	beforeEach(() => {
		cy.openHomePage();
	});

	it('page title', () => {
		cy.get(data.homePage.pageTitle).should('be.visible');
	});

	it('movie display', () => {
		cy.get(data.homePage.movieTitles).should('have.length.greaterThan', 0);
		for (const title of ['Сталкер(1979)', 'Ведьмак', 'Законопослушный гражданин']) {
			cy.checkMovieVisibility(title, data.homePage.movieTitles, '.movie__title');
		}
	});

	it('Show correct number of days', () => {
		cy.get(data.homePage.dayNavigation).should('have.length', 7);
	});
});

describe('admin login', () => {
	it('successful login check', () => {
		const user = data.users.happy;
		cy.openAdminPage();

		cy.get(data.selectors.emailInput).type(user.email);
		cy.get(data.selectors.passwordInput).type(user.password);
		cy.get(data.selectors.loginButton).click();

		cy.contains(data.selectors.adminPageTitle).should('be.visible');
	});

	it('check for unsuccessful login', () => {
		const user = data.users.sad;
		cy.openAdminPage();

		cy.get(data.selectors.emailInput).type(user.email);
		cy.get(data.selectors.passwordInput).type(user.password);
		cy.get(data.selectors.loginButton).click();

		cy.contains('body', data.selectors.errorMessage).should('be.visible');
	});
});

describe('name from the admin panel', () => {
	it('ticket booking', () => {
		const user = data.users.happy;
		const seats = data.seats;
		const selectors = data.selectors2;

		cy.openAdminPage();
		cy.get(selectors.emailInput).type(user.email);
		cy.get(selectors.passwordInput).type(user.password);
		cy.get(selectors.loginButton).click();

		cy.get(selectors.confStepMovie)
			.contains(selectors.confStepMovieTitle, 'Ведьмак')
			.invoke('text')
			.then((filmNameFromAdmin) => {
				cy.visit('https://qamid.tmweb.ru/client/index.php');

				cy.get(selectors.movie)
					.contains(selectors.movieTitle, filmNameFromAdmin)
					.invoke('text')
					.then((filmNameFromSite) => {
						expect(filmNameFromSite.trim()).to.equal(filmNameFromAdmin.trim());

						cy.get(selectors.pageNavDay).click();

						cy.get('.movie').contains(selectors.timeSlot).click();

						seats.forEach((seat) => {
							const seatSelector = selectors.buyingSchemeRow
								.replace('{row}', seat.row)
								.replace('{seat}', seat.seat);
							cy.get(seatSelector).should('be.visible').click();
						});

						cy.get(selectors.acceptButton).click();
						cy.contains(selectors.successMessage).should('be.visible');
					});
			});
	});
});
  
  
