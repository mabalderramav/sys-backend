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
        stage('Compile TypeScript') {
            steps {
                bat 'npx tsc'
            }
        }
        stage('Run Tests') {
            steps {
                bat 'npm test'
            }
        }
        stage('Deploy') {
            steps {
                script {
                    try {
                        bat 'pm2 delete my-app || echo "No previous app instance running"'
                    } catch (Exception e) {
                        echo 'No previous app instance running'
                    }
                    // Ejecuta el proyecto utilizando la variable de entorno PORT
                    bat 'pm2 start dist/index.js --name "my-app" --watch -- -p %PORT%'
                    bat 'pm2 save'
                }
            }
        }
    }
    post {
        always {
            echo 'Skipping workspace cleanup because the application is running with pm2.'
        }
    }
}
