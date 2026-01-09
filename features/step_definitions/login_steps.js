const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../pages/LoginPage'); // On réutilise ton POM !

Given('I access the login page', async function () {
    // "this.page" vient du fichier hooks.js
    this.loginPage = new LoginPage(this.page);
    await this.loginPage.goto();
});

When('I perform login with {string} and {string}', async function (email, password) {
    await this.loginPage.login(email, password);
});

Then('I should see the user menu', async function () {
    await this.loginPage.verifyUserIsLoggedIn();
});

Then('I should see an error message containing {string}', async function (expectedMessage) {
    await this.loginPage.verifyErrorMessage(expectedMessage);
});