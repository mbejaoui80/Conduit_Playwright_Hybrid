const { expect } = require('@playwright/test');

exports.ArticlePage = class ArticlePage {

  constructor(page) {
    this.page = page;
    // La zone de texte pour écrire le commentaire
    this.commentInput = page.locator('textarea[placeholder="Write a comment..."]');
    // Le bouton pour envoyer
    this.postCommentButton = page.locator('button:has-text("Post Comment")');
    // La liste des commentaires affichés (on cherche le texte du corps du commentaire)
    this.commentBody = page.locator('.card-text');
  }

  async postComment(commentText) {
    await this.commentInput.fill(commentText);
    await this.postCommentButton.click();
  }

  async verifyCommentIsVisible(expectedText) {
    // On vérifie que l'un des commentaires contient le texte attendu
    await expect(this.commentBody.filter({ hasText: expectedText }).first()).toBeVisible();
  }
};