Feature: Gestion des articles

  Background:
    Given I am logged in as a valid user

  Scenario: Créer puis supprimer un article
    Given I access the editor page
    # NOUVEAU TITRE pour éviter le conflit
    When I create an article with title "Test Auto Final V102" and description "Ceci est un test auto"
    Then I should be redirected to the article page with title "Test Auto Final V102"
    # L'étape magique pour nettoyer
    And I delete the article