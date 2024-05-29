pipeline {
    agent any

    environment {
        PATH = "/usr/local/bin:$PATH"
    }

    tools {
        nodejs 'node-js'
        dockerTool 'docker'
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

        stage('Test') {
            steps {
                sh 'npm run test'
            }
        }

        stage('Deploy') {
            steps {
                echo 'Deploying....'
                // deployment script here
                echo 'Deployed!'
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