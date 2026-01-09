const { When, Then } = require('@cucumber/cucumber');
const { ArticlePage } = require('../../pages/ArticlePage');

When('I post a comment {string}', async function (commentText) {
    // On initialise la page Article
    this.articlePage = new ArticlePage(this.page);
    await this.articlePage.postComment(commentText);
});

Then('I should see the comment {string}', async function (expectedText) {
    await this.articlePage.verifyCommentIsVisible(expectedText);
});