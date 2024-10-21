pipeline {
    agent any

    environment {
        CONNECTION_STRING = 'postgresql://postgres.faggntrzkifpwlwsuumd:58@G_ZHj6Z8i_7-@aws-0-us-west-1.pooler.supabase.com:6543/postgres'
        PORT = '3050'  // Define el puerto en el que la aplicación debe correr
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

        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                // Intenta detener cualquier instancia anterior
                bat 'pm2 delete my-app || echo "No previous app instance running"'

                // Inicia la aplicación utilizando pm2
                bat 'pm2 start npm --name "my-app" -- run start'

                // Guarda la configuración actual de PM2
                bat 'pm2 save'

                // Muestra la lista de procesos de PM2 para verificar que la aplicación esté corriendo
                bat 'pm2 list'

                // Verifica si la aplicación está corriendo en el puerto esperado
                bat 'netstat -an | findstr :3050 || echo "No application is listening on port 3050"'
            }
        }
    }

    post {
        always {
            echo 'Skipping workspace cleanup because the application is running with pm2.'
        }
    }
}
