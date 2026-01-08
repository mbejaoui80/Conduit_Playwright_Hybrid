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
                // 1. On installe Java (Indispensable pour Allure)
                // Le 'apt-get update' est nécessaire pour qu'il trouve les paquets
                sh 'apt-get update && apt-get install -y default-jre'

                // 2. Vérifications habituelles
                sh 'node --version'
                sh 'java -version' // Juste pour vérifier dans les logs que c'est bien là
                
                // 3. Installation et Test
                sh 'npm ci'
                sh 'npx playwright test --workers=1'
            }

            post {
                always {
                    script {
                        allure([
                            includeProperties: false,
                            jdk: '',
                            properties: [],
                            reportBuildPolicy: 'ALWAYS',
                            results: [[path: 'allure-results']]
                        ])
                    }
                    cleanWs()
                }
            }
        }
    }
}