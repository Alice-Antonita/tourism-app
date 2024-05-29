pipeline {
    agent any

    tools {
        nodejs 'node'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/your-username/your-nextjs-project.git', branch: 'main'
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deplying....'
                // Add your deployment script here
                // For example, to deploy to a server via SSH:
                // sh 'scp -r build/ user@your-server:/path/to/deployment'
            }
        }
    }

    post {
        always {
            echo 'Cleaning up...'
            sh 'rm -rf node_modules'
        }
        success {
            echo 'Pipeline completed successfully.'
        }
        failure {
            echo 'Pipeline failed.'
        }
    }
}