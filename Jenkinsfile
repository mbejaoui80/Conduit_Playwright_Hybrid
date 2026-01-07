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

            // CORRECTION : Le bloc post doit être ICI, à l'intérieur du stage
            post {
                always {
                    archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
                }
            }
        }
    }
}