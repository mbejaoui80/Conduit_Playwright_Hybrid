const { expect } = require('@playwright/test');

exports.LoginPage = class LoginPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    this.page = page;
    // On définit les sélecteurs ici (les "locators")
    this.emailInput = page.locator('input[placeholder="Email"]');
    this.passwordInput = page.locator('input[placeholder="Password"]');
    this.signInButton = page.locator('button[type="submit"]');
    this.userMenu = page.locator('.user-pic'); // L'avatar en haut à droite
    this.signInButton = page.locator('button:has-text("Sign in")');
    
    this.errorMessage = page.locator('.error-messages');
  }

  // Action : Aller sur la page de login
  async goto() {
    await this.page.goto('/login');
  }

  // Action : Remplir le formulaire et valider
  async login(email, password) {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.signInButton.click();
  }

  // Vérification : Est-ce qu'on est bien connecté ?
  async verifyUserIsLoggedIn() {
    await expect(this.userMenu).toBeVisible();
  }

  // NOUVEAU : Vérifier qu'un message d'erreur spécifique apparaît
  async verifyErrorMessage(expectedText) {
    // On regarde si la liste des erreurs contient le texte attendu
    await expect(this.errorMessage).toContainText(expectedText);
}  
};