pipeline {
    agent any

    environment {
        CONNECTION_STRING = 'postgresql://postgres.faggntrzkifpwlwsuumd:58@G_ZHj6Z8i_7-@aws-0-us-west-1.pooler.supabase.com:6543/postgres'
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
                // Ejecuta la aplicación en segundo plano usando pm2
                bat 'pm2 start npm --name "my-app" -- run start'
                bat 'pm2 save'
            }
        }
    }

    post {
        always {
            // Mensaje para indicar que no se realiza la limpieza del workspace
            echo 'Skipping workspace cleanup because the application is running with pm2.'
        }
    }
}
