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
  // Modifie ou ajoute cette méthode
  
  async clickFirstTag() {
    // On attend que la liste des tags s'affiche
    await this.popularTags.first().waitFor();
    
    // On récupère le texte du tout premier tag de la liste
    const tagText = await this.popularTags.first().textContent();
    const cleanTag = tagText.trim(); // On nettoie les espaces inutiles
    
    // On clique dessus
    await this.popularTags.first().click();
    
    // On attend que le chargement soit fini
    await this.page.waitForLoadState('networkidle');
    
    // IMPORTANT : On renvoie le nom du tag pour que le test puisse s'en servir
    return cleanTag;
  }

  // Vérifier que l'onglet du filtre porte bien le nom du tag
  async verifyTagIsActive(tagName) {
    await expect(this.activeTab).toHaveText(tagName);
  }
};