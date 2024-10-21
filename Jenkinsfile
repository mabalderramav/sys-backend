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
                // Usa el Node.js instalado globalmente para instalar dependencias
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Ejecuta los tests con Node.js instalado globalmente
                sh 'npm test'
            }
        }

        stage('Deploy') {
            steps {
                // Ejecuta la aplicación en el puerto 3050
                sh 'PORT=3050 npm start &'
            }
        }
    }

    post {
        always {
            cleanWs()
        }
    }
}
