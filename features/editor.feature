Feature: Gestion des articles

  # Le Background s'exécute avant chaque Scénario de ce fichier
  Background:
    Given I am logged in as a valid user

  Scenario: Créer un nouvel article avec succès
    Given I access the editor page
    # CORRECTION : Ajoute un chiffre ou change le texte pour qu'il soit nouveau
    When I create an article with title "Mon Article Unique 99" and description "Ceci est un test auto"
    Then I should be redirected to the article page with title "Mon Article Unique 99"