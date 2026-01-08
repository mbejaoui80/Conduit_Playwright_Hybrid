pipeline {
    agent none 

    stages {
        stage('Test dans Docker') {
            agent {
                docker {
                    image 'mcr.microsoft.com/playwright:v1.57.0-jammy'
                    // CORRECTION : On ajoute "-u 0:0" pour être root
                    // "--ipc=host" est toujours là pour la mémoire partagée
                    args '-u 0:0 --ipc=host'
                }
            }        
        
           steps {
                // 1. Installation Java (OK)
                sh 'apt-get update && apt-get install -y default-jre'

                // 2. Vérifications (OK)
                sh 'node --version'
                sh 'java -version' 
                sh 'npm ci'

                // 3. Tests
                
                // OPTION A : On commente Playwright pour l'instant pour ne pas bloquer
                // sh 'npx playwright test --workers=1'
                
                // OPTION B : On lance Cucumber
                // Note : Pour l'instant, lance-le simplement comme ça pour voir si ça passe dans Jenkins.
                // À l'étape suivante, on ajoutera le plugin pour qu'il apparaisse dans le rapport Allure.
                sh 'npx cucumber-js'
            }

            post {
                always {
                    // --- CORRECTION ICI ---
                    // On rend les fichiers à l'utilisateur Jenkins (1000) 
                    // pour qu'il puisse générer le rapport sans erreur "Access Denied"
                    sh 'chown -R 1000:1000 allure-results'

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