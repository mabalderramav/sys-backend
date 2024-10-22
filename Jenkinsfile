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
        stage('Install PM2') {
            steps {
                bat 'npm install -g pm2'
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
                    // Instalar `pm2` globalmente si no está instalado
                    bat 'npm install -g pm2'

                    // Detener cualquier proceso previo de pm2 llamado "sys-backend"
                    bat 'pm2 delete sys-backend || echo "No hay una instancia previa corriendo"'

                    // Iniciar la aplicación con pm2 y configurarla para ejecutarse como un servicio
                    bat 'pm2 start dist/index.js --name sys-backend --watch -- -p 3050'

                    // Guardar la configuración de pm2 para restaurar en el reinicio del sistema
                    bat 'pm2 save'

                    // Hacer que pm2 se inicie automáticamente cuando el sistema arranca
                    bat 'pm2 startup'
                }
            }
        }
        stage('Verify Application') {
            steps {
                script {
                    // Agregar un sleep de 10 segundos usando PowerShell
                    bat 'powershell -command "Start-Sleep -Seconds 10"'

                    // Verificar si la aplicación está corriendo en el puerto 3050
                    def output = bat(script: 'netstat -an | findstr 3050', returnStdout: true).trim()
                    if (!output.contains('LISTENING')) {
                        error "La aplicación no está corriendo en el puerto 3050"
                    }
                }
            }
        }
    }
    post {
        always {
            echo 'Skipping workspace cleanup because the application is running with PM2.'
        }
        failure {
            echo 'El despliegue falló, revisa los logs para más detalles.'
        }
    }
}
