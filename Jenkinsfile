pipeline {
    agent any

    environment {
        // Define la versión de Node.js a usar (asegúrate de que esta versión esté configurada en Jenkins)
        NODEJS_VERSION = 'NodeJS 20.12.2'  // Cambia este valor al nombre que configuraste en "Global Tool Configuration"
        // Agrega la variable de entorno para la cadena de conexión
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
                // Usa la versión de Node.js configurada
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
                // Ejecuta la aplicación en el puerto 3050 (asegúrate de que el script "start" esté definido en package.json)
                sh 'PORT=3050 npm start &'
            }
        }
    }

    post {
        always {
            // Opcional: limpiar el workspace después de la ejecución
            cleanWs()
        }
    }
}
