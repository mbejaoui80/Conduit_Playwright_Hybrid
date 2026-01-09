const { Given, When, Then } = require('@cucumber/cucumber');
const { HomePage } = require('../../pages/HomePage');

Given('I access the home page', async function () {
    this.homePage = new HomePage(this.page);
    await this.homePage.goto();
});

// Remplace les blocs existants par ceux-ci :

When('I click on the first popular tag', async function () {
    this.selectedTag = await this.homePage.clickFirstTag();
    console.log("Tag sélectionné : " + this.selectedTag);
});

Then('the active tab should be the selected tag', async function () {
    await this.homePage.verifyTagIsActive(this.selectedTag);

});