const { Before, After, BeforeAll, AfterAll, setDefaultTimeout } = require('@cucumber/cucumber');
const { chromium } = require('@playwright/test');

// Timeout global pour éviter que ça coupe trop vite
setDefaultTimeout(60 * 1000);

let browser;

BeforeAll(async function () {
    // Change "headless: true" en "headless: false" pour voir l'écran
    browser = await chromium.launch({ headless: true }); 
});

Before(async function () {
    // CORRECTION ICI : On définit la baseURL pour ce scénario
    this.context = await browser.newContext({
        baseURL: 'https://conduit.bondaracademy.com/'
    });
    
    this.page = await this.context.newPage();
});

After(async function () {
    await this.page.close();
    await this.context.close();
});

AfterAll(async function () {
    await browser.close();
});