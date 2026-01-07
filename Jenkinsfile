pipeline {
    agent none // On ne lance rien sur le maître

    stages {
        stage('Test dans Docker') {
            // C'est ICI que la magie opère : Jenkins va créer un conteneur pour ce stage
            agent {
                docker {
                    // L'image officielle de Playwright (contient Node, Chrome, Firefox...)
                    // On utilise 'jammy' (Ubuntu 22.04) pour la stabilité
                    image 'mcr.microsoft.com/playwright:v1.57.0-jammy'
                    
                    // --ipc=host est OBLIGATOIRE pour éviter que Chrome ne crashe par manque de mémoire
                    args '--ipc=host'
                }
            }

            steps {
                // Vérification de où on est (pour le debug)
                sh 'node --version'
                
                // Installation des paquets (rapide car l'image a déjà les pré-requis systèmes)
                sh 'npm ci'
                
                // CORRECTION : On retire --headless qui n'existe pas en CLI
                sh 'npx playwright test --workers=1'
            }
        }
    }
}