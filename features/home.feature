Feature: Page d'accueil et Filtres

Scenario: Filtrer les articles par le premier Tag populaire disponible
    Given I access the home page
    When I click on the first popular tag
    Then the active tab should be the selected tag