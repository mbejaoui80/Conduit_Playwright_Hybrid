module.exports = {
  default: {
    // 1. On charge tes steps et tes hooks
    require: [
      "features/step_definitions/*.js",
      "features/support/*.js"
    ],
    // 2. On définit les formats de sortie
    format: [
      "progress",                    // Affiche des points ... dans la console (pour les humains)
      "allure-cucumberjs/reporter"   // Génère les fichiers pour le rapport Allure (pour Jenkins)
    ],
    // 3. On configure où mettre les résultats
    formatOptions: {
      resultsDir: "allure-results"   // IMPORTANT : Doit correspondre à ce qu'on a mis dans Jenkinsfile
    }
  }
}