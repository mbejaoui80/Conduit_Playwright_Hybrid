pipeline {
    agent none 

    stages {
        stage('Test dans Docker') {
            agent {
                docker {
                    // Image Playwright officielle v1.57.0
                    image 'mcr.microsoft.com/playwright:v1.57.0-jammy'
                    args '--ipc=host'
                }
            }

            steps {
                // Debug infos
                sh 'node --version'
                
                // Installation des dépendances
                sh 'npm ci'
                
                // Lancement des tests
                // Note : On ne met PAS --headless ici, car c'est géré par le config
                sh 'npx playwright test --workers=1'
            }
        }
    }
}