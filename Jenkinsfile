pipeline {
    agent any

    environment {
        NODEJS_VERSION = 'node'  // Asegúrate de que coincida exactamente con el nombre configurado
        CONNECTION_STRING = 'postgresql://postgres.faggntrzkifpwlwsuumd:58@G_ZHj6Z8i_7-@aws-0-us-west-1.pooler.supabase.com:6543/postgres'
    }

    stages {
        stage('Checkout') {
            steps {
                // Clona el repositorio de GitHub
                git url: 'https://github.com/enunez-dev/sys-backend.git', branch: 'master'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    def nodeHome = tool name: "${NODEJS_VERSION}", type: 'NodeJS'
                    env.PATH = "${nodeHome}/bin:${env.PATH}"
                }

                // Instala las dependencias
                sh 'npm install'
            }
        }

        stage('Run Tests') {
            steps {
                // Ejecuta los tests (opcional, si tienes pruebas configuradas)
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
