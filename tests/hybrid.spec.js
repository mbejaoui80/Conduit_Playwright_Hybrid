const { test, expect } = require('@playwright/test');

test('Scénario Hybride : Création API -> Vérification UI', async ({ request, page }) => {
  // ^^^ ATTENTION : J'ai ajouté "page" ici !

  // --- PARTIE 1 : API (Back-Office) ---
  
  const randomId = Math.floor(Math.random() * 10000);
  const userData = {
      user: {
          username: `Tester${randomId}`,
          email: `tester${randomId}@demo.com`,
          password: "password123"
      }
  };

  // 1. Création User
  const response = await request.post('/api/users', { data: userData });
  expect(response.status()).toBe(201);
  const responseBody = await response.json();
  const token = responseBody.user.token;

  // 2. Publication Article
  const articleData = {
      article: {
          title: `Titre ${randomId}`,
          description: "Description automatique",
          body: "Article hybride Playwright",
          tagList: ["playwright"]
      }
  };
  
  const articleResponse = await request.post('/api/articles', {
      data: articleData,
      headers: { 'Authorization': `Token ${token}` }
  });
  expect(articleResponse.status()).toBe(201);
  const articleBody = await articleResponse.json();
  const slug = articleBody.article.slug;

  console.log("✅ API : Données prêtes. Passage au navigateur...");


  // --- PARTIE 2 : UI (Front-Office) ---

  // 3. INJECTION DU TOKEN (Technique Ninja)
  // On injecte le token dans le LocalStorage du navigateur AVANT de charger la page
  await page.addInitScript(value => {
      window.localStorage.setItem('jwtToken', value);
  }, token);

  // 4. NAVIGATION
  // On va directement sur la page de l'article (pas besoin de chercher)
  // CORRECTION : On force l'URL du site Frontend (sans -api)
  await page.goto(`https://conduit.bondaracademy.com/article/${slug}`);

  // 5. VÉRIFICATION VISUELLE
  // On vérifie que le titre H1 correspond bien à ce qu'on a envoyé
  await expect(page.locator('h1')).toHaveText(articleData.article.title);

  // Petit screenshot pour la gloire (sera dans le dossier test-results)
  await page.screenshot({ path: `preuvre-article-${randomId}.png` });
  
  console.log("🎉 UI : Article vérifié visuellement !");
});