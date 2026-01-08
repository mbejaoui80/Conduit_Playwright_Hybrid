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
                    // On appelle le plugin Allure
                    script {
                        allure([
                            includeProperties: false,
                            jdk: '',
                            properties: [],
                            reportBuildPolicy: 'ALWAYS',
                            // IMPORTANT : Doit correspondre au dossier généré par Playwright
                            results: [[path: 'allure-results']]
                        ])
                    }
                    //  On garde le nettoyage pour ne pas saturer le disque
                    cleanWs()
                }
                
            }
        }
    }
}