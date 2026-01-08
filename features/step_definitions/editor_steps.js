const { Given, When, Then } = require('@cucumber/cucumber');
const { LoginPage } = require('../../pages/LoginPage');
const { EditorPage } = require('../../pages/EditorPage');

// --- ÉTAPES DU BACKGROUND (LOGIN) ---

Given('I am logged in as a valid user', async function () {
    // On réutilise la logique de connexion ici
    const loginPage = new LoginPage(this.page);
    await loginPage.goto();
    // ⚠️ Remplace par ton email/password valides (ceux qui marchent)
    await loginPage.login('mohamed.test@gmail.com', 'motdepasse123');
    await loginPage.verifyUserIsLoggedIn();
});

// --- ÉTAPES DE L'ÉDITEUR ---

Given('I access the editor page', async function () {
    this.editorPage = new EditorPage(this.page);
    await this.editorPage.goto();
});

When('I create an article with title {string} and description {string}', async function (title, description) {
    // On remplit le formulaire (avec un corps de texte et un tag par défaut)
    await this.editorPage.submitArticle(title, description, "Ceci est le corps de mon article généré par robot.", "test-automation");
});

Then('I should be redirected to the article page with title {string}', async function (expectedTitle) {
    // On vérifie que le titre est bien affiché
    await this.editorPage.verifyArticleTitle(expectedTitle);
});