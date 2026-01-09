const { expect } = require('@playwright/test');

exports.EditorPage = class EditorPage {

  /**
   * @param {import('@playwright/test').Page} page
   */
  constructor(page) {
    
    this.page = page;
    // Les sélecteurs du formulaire
    this.titleInput = page.locator('input[placeholder="Article Title"]');
    this.descriptionInput = page.locator('input[placeholder="What\'s this article about?"]');
    this.bodyInput = page.locator('textarea[placeholder="Write your article (in markdown)"]');
    this.tagsInput = page.locator('input[placeholder="Enter tags"]');
    this.publishButton = page.locator('button:has-text("Publish Article")');
    
    // Le titre qui apparaît APRÈS la publication (pour vérifier)
    this.articleTitle = page.locator('h1');
    
    // Le bouton poubelle (on prend le premier qu'on trouve sur la page)
    this.deleteButton = page.locator('button:has-text("Delete Article")').first();
  }

  // Action : Aller directement sur la page de création
  async goto() {
    await this.page.goto('/editor');
  }

  // Action : Remplir tout le formulaire d'un coup
  async submitArticle(title, description, body, tags) {
    await this.titleInput.fill(title);
    await this.descriptionInput.fill(description);
    await this.bodyInput.fill(body);
    await this.tagsInput.fill(tags);
    await this.publishButton.click();
  }

  // Vérification : Est-ce que le titre affiché est le bon ?
  async verifyArticleTitle(expectedTitle) {
    // CORRECTION : On ajoute un timeout de 20000ms (20 secondes)
    await expect(this.articleTitle).toHaveText(expectedTitle, { timeout: 20000 });
  }

  // Action de supprimer
  async deleteArticle() {
    // Sur Conduit, il faut parfois accepter une confirmation système (dialogue)
    // Cette ligne gère automatiquement le "OUI" si une fenêtre apparaît
    this.page.on('dialog', dialog => dialog.accept());

    await this.deleteButton.click();
    
    // On attend d'être redirigé vers l'accueil pour être sûr que c'est fini
    await this.page.waitForURL('**/');
  }
};