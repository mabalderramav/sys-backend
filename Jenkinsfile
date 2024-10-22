pipeline {
    agent any

    environment {
        CONNECTION_STRING = 'postgresql://postgres.faggntrzkifpwlwsuumd:58@G_ZHj6Z8i_7-@aws-0-us-west-1.pooler.supabase.com:6543/postgres'
        PORT = '3050'
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
        stage('Compile TypeScript') {
            steps {
                bat 'npx tsc'
            }
        }
        stage('Deploy with PowerShell') {
            steps {
                script {
                    // Detener cualquier instancia anterior
                    bat '''
                        powershell -Command "try { Stop-Process -Name node -Force -ErrorAction SilentlyContinue } catch { echo No previous app instance running }"
                    '''

                    // Iniciar la aplicación en segundo plano
                    bat '''
                        powershell -Command "Start-Process -FilePath 'node' -ArgumentList 'dist/index.js -p 3050' -NoNewWindow -PassThru"
                    '''
                }
            }
        }
        stage('Verify Application') {
            steps {
                script {
                    // Esperar unos segundos para asegurarse de que la aplicación esté en ejecución
                    sleep 10
                    bat 'netstat -an | findstr 3050'
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
