pipeline {
    agent any

    environment {
        CONNECTION_STRING = 'postgresql://postgres.faggntrzkifpwlwsuumd:58@G_ZHj6Z8i_7-@aws-0-us-west-1.pooler.supabase.com:6543/postgres'
        PORT = '3050'
        // PM2_HOME = 'C:\\tools\\.pm2'
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
        // stage('Install PM2') {
        //     steps {
        //         bat 'npm install -g pm2'
        //     }
        // }
        stage('Compile TypeScript') {
            steps {
                bat 'npx tsc'
            }
        }
        stage('Deploy with PowerShell') {
            steps {
                script {
                    // Intentar detener cualquier proceso de Node.js que esté corriendo
                    powershell '''
                        try {
                            Stop-Process -Name node -Force -ErrorAction Stop
                        } catch {
                            Write-Output "No previous app instance running"
                        }
                    '''

                    // Iniciar la aplicación en segundo plano
                    powershell '''
                        $script = {
                            Start-Process -FilePath node -ArgumentList 'dist/index.js -p 3050' -PassThru -NoNewWindow -RedirectStandardOutput 'C:\\data\\jenkins_home\\workspace\\backend\\app.log' -RedirectStandardError 'C:\\data\\jenkins_home\\workspace\\backend\\app_error.log'
                        }
                        Start-Job -ScriptBlock $script | Out-Null
                    '''
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
