pipeline {
    agent none 

    stages {
        stage('Test dans Docker') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.57.0-jammy'
                    args '--ipc=host'
                }
            }
            steps {
                sh 'node --version'
                sh 'npm ci'
                sh 'npx playwright test --workers=1'
            }
        }
    }

    // NOUVEAU BLOC A AJOUTER ICI :
    post {
        always {
            // "always" veut dire : même si les tests échouent (rouge), on veut le rapport !
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            
            // Optionnel : Nettoyer l'espace de travail pour gagner de la place
            cleanWs()

            // Build automatique
        }
    }
}