pipeline {
    agent any

    environment {
        CONNECTION_STRING = 'postgresql://postgres.faggntrzkifpwlwsuumd:58@G_ZHj6Z8i_7-@aws-0-us-west-1.pooler.supabase.com:6543/postgres'
        PORT = '3050'
        PM2_HOME = 'C:\\tools\\.pm2'
        NPM_GLOBAL_PATH = "${env.USERPROFILE}\\AppData\\Roaming\\npm" // Ruta típica de instalación global de npm en Windows
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
                    // Ejecutar el comando where para encontrar pm2 y almacenar la ruta en la variable de entorno PM2_PATH
                    def pm2PathOutput = bat(script: 'where pm2', returnStdout: true).trim()

                    if (pm2PathOutput.contains('INFO: No se pudo encontrar ningún archivo')) {
                        error "No se pudo encontrar la ruta de PM2"
                    } else {
                        env.PM2_PATH = pm2PathOutput
                        echo "PM2 se encuentra en: ${env.PM2_PATH}"
                    }
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
                        // Detener cualquier instancia anterior
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
