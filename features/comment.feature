Feature: Gestion des commentaires

  Background:
    Given I am logged in as a valid user

  Scenario: Poster un commentaire sur un article
    # 1. On crée d'abord un article (Pré-requis)
    Given I access the editor page
    When I create an article with title "Article pour Commentaire" and description "Test de comm"
    
    # 2. Une fois redirigé sur l'article, on poste le commentaire
    When I post a comment "Ceci est un commentaire automatisé super cool !"
    
    # 3. On vérifie qu'il est là
    Then I should see the comment "Ceci est un commentaire automatisé super cool !"
    
    # 4. Nettoyage (On supprime l'article, ce qui supprime aussi les comms)
    And I delete the article