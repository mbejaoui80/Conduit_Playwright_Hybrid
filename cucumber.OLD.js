module.exports = {
  default: {
    require: [
      "features/step_definitions/*.js",
      "features/support/*.js"
    ],
    format: [
      "progress",
      "allure-cucumberjs/reporter"
    ],
    formatOptions: {
      resultsDir: "allure-results"
    }
  }
}