const { Given, When, Then } = require('@cucumber/cucumber');
const { HomePage } = require('../../pages/HomePage');

Given('I access the home page', async function () {
    this.homePage = new HomePage(this.page);
    await this.homePage.goto();
});

When('I click on the tag {string}', async function (tagName) {
    await this.homePage.clickTag(tagName);
});

Then('the active tab should be {string}', async function (expectedTagName) {
    await this.homePage.verifyTagIsActive(expectedTagName);
});