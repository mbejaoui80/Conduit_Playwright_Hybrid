const { expect } = require('@playwright/test');

exports.HomePage = class HomePage {

  constructor(page) {
    this.page = page;
    // La liste des tags populaires à droite
    this.popularTags = page.locator('.sidebar .tag-list a');
    // L'onglet actif (au milieu) qui montre quel filtre est en cours
    this.activeTab = page.locator('.feed-toggle .nav-link.active');
  }

  async goto() {
    await this.page.goto('/');
  }

  // Cliquer sur un tag spécifique
  async clickTag(tagName) {
    // On cherche le tag qui contient le texte exact et on clique
    await this.popularTags.filter({ hasText: tagName }).first().click();
    
    // Astuce : On attend que le réseau se calme car le clic recharge la liste des articles
    await this.page.waitForLoadState('networkidle');
  }

  // Vérifier que l'onglet du filtre porte bien le nom du tag
  async verifyTagIsActive(tagName) {
    await expect(this.activeTab).toHaveText(tagName);
  }
};