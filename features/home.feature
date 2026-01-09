Feature: Page d'accueil et Filtres

  Scenario: Filtrer les articles par Tag populaire
    Given I access the home page
    When I click on the tag "welcome"
    Then the active tab should be "welcome"