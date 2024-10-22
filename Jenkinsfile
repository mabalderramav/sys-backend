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
        stage('Install Forever') {
            steps {
                bat 'npm install -g forever'
            }
        }
        stage('Compile TypeScript') {
            steps {
                bat 'npx tsc'
            }
        }
        // stage('Run Tests') {
        //     steps {
        //         bat 'npm test'
        //     }
        // }
        stage('Deploy') {
            steps {
                script {
                    try {
                        // Intenta detener cualquier instancia anterior de la aplicación
                        bat 'forever stop dist/index.js || echo "No previous app instance running"'
                    } catch (Exception e) {
                        echo 'No previous app instance running'
                    }
                    // Inicia la aplicación usando forever y guarda los logs
                    bat 'forever start -a --minUptime 1000 --spinSleepTime 1000 -l C:/data/jenkins_home/workspace/backend/forever.log -o C:/data/jenkins_home/workspace/backend/out.log -e C:/data/jenkins_home/workspace/backend/err.log dist/index.js -p 3050'
                }
            }
        }
        stage('Verify Application') {
            steps {
                script {
                    sleep(time: 10, unit: 'SECONDS')  // Agrega un retraso para dar tiempo a que la aplicación se inicie
                    def output = bat(script: 'netstat -an | findstr 3050', returnStdout: true).trim()
                    if (!output.contains('LISTENING')) {
                        error "La aplicación no está corriendo en el puerto 3050"
                    }
                }
            }
        }
        stage('Check Forever Logs') {
            steps {
                // Muestra el contenido de los logs para depuración
                bat 'type forever.log'
                bat 'type out.log'
                bat 'type err.log'
            }
        }
    }
    post {
        always {
            echo 'Skipping workspace cleanup because the application is running with forever.'
            // Muestra los logs de Forever aunque la compilación haya fallado
            script {
                bat 'type forever.log'
                bat 'type out.log'
                bat 'type err.log'
            }
        }
        failure {
            echo 'El despliegue falló, revisa los logs para más detalles.'
        }
    }
}
