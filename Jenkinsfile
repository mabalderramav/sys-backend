pipeline {
    agent any

    environment {
        CONNECTION_STRING = 'postgresql://postgres.faggntrzkifpwlwsuumd:58@G_ZHj6Z8i_7-@aws-0-us-west-1.pooler.supabase.com:6543/postgres'
        PORT = '3050'
        PM2_HOME = 'C:\\tools\\.pm2'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/enunez-dev/sys-backend.git', branch: 'master'
            }
        }
        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }
        stage('Find PM2 Path') {
            steps {
                script {
                    // Encontrar la ruta de pm2 y guardarla en una variable
                    def pm2PathOutput = bat(script: 'where pm2', returnStdout: true).trim()
                    if (!pm2PathOutput) {
                        error "PM2 no se encontró en el sistema."
                    }
                    // Usar la primera ruta encontrada
                    env.PM2_PATH = pm2PathOutput.split('\r\n')[0]
                    echo "PM2 encontrado en: ${env.PM2_PATH}"
                }
            }
        }
        stage('Compile TypeScript') {
            steps {
                bat 'npx tsc'
            }
        }
        stage('Deploy with PM2') {
            steps {
                script {
                    try {
                        bat "\"${env.PM2_PATH}\" stop sys-backend || echo \"No previous app instance running\""
                        bat "\"${env.PM2_PATH}\" delete sys-backend || echo \"No previous app instance to delete\""
                    } catch (Exception e) {
                        echo 'No previous app instance running or failed to stop'
                    }
                    // Iniciar la aplicación con PM2 en segundo plano
                    bat "\"${env.PM2_PATH}\" start dist/index.js --name \"sys-backend\" -- -p %PORT%"
                    // Guardar la lista de procesos de PM2
                    bat "\"${env.PM2_PATH}\" save"
                }
            }
        }
    }
    post {
        always {
            echo 'Proceso de despliegue del sys-backend completado.'
        }
        failure {
            echo 'El despliegue falló, revisa los logs para más detalles.'
        }
    }
}
