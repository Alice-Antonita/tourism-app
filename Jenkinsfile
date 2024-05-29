pipeline {
    agent any

    tools {
        nodejs 'node-js'
    }

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Alice-Antonita/tourism-app.git', branch: 'tests'
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

        stage('Docker Build') {
            steps {
                sh '/usr/local/bin/docker-compose build'
            }
        }

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Docker push') {
            steps {
                sh '/usr/local/bin/docker-compose push'
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