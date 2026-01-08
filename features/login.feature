Feature: Authentification sur Conduit

  Scenario: Connexion réussie avec un utilisateur valide
    Given I access the login page
    # CORRECTION : Mets ICI l'email et le mot de passe que tu viens de créer
    When I perform login with "mohamed.test@gmail.com" and "motdepasse123"
    Then I should see the user menu