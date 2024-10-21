pipeline {
    agent any

    environment {
        CONNECTION_STRING = 'postgresql://postgres.faggntrzkifpwlwsuumd:58@G_ZHj6Z8i_7-@aws-0-us-west-1.pooler.supabase.com:6543/postgres'
        PORT = '3050'  // Asegúrate de que el puerto esté configurado
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/enunez-dev/sys-backend.git', branch: 'master'
            }
        }

        stage('Install Dependencies') {
            steps {
                // Instala las dependencias del proyecto con npm
                bat 'npm install'
            }
        }

        stage('Install PM2') {
            steps {
                // Instala pm2 globalmente
                bat 'npm install -g pm2'
            }
        }

        stage('Run Tests') {
            steps {
                // Ejecuta los tests del proyecto
                bat 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                // Detén cualquier instancia previa de la aplicación con pm2
                bat 'pm2 delete my-app || echo "No previous app instance running"'
                
                // Ejecuta la aplicación en segundo plano usando pm2
                bat 'pm2 start npm --name "my-app" -- run start'

                // Guarda la configuración de pm2 para reinicios futuros
                bat 'pm2 save'

                // Muestra el estado de pm2 para verificar si la aplicación está corriendo
                bat 'pm2 list'
            }
        }
    }

    post {
        always {
            echo 'Skipping workspace cleanup because the application is running with pm2.'
        }
    }
}
