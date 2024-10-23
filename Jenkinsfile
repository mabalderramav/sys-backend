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
                    // Usar un script de Node.js para encontrar la ruta de pm2
                    def pm2PathScript = '''
                        const which = require('which');
                        try {
                            const pm2Path = which.sync('pm2');
                            console.log(pm2Path);
                        } catch (err) {
                            console.error('PM2 not found');
                            process.exit(1);
                        }
                    '''

                    // Ejecutar el script y capturar la salida
                    def pm2Path = bat(script: "node -e \"${pm2PathScript}\"", returnStdout: true).trim()

                    if (pm2Path.contains('PM2 not found')) {
                        error "No se pudo encontrar la ruta de PM2"
                    } else {
                        env.PM2_PATH = pm2Path
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
