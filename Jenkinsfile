pipeline {
    agent any

    environment {     
    DOCKERHUB_CREDENTIALS= credentials('dockerhubcredentials')     
    } 
    
    stages {
        stage('Build') {         
      steps{
           echo "Building Docker image"
	       sh 'sudo docker compose build'           
           echo 'Build Image Completed'                
      }           
    }
        stage('Unit Tests') {
            steps {
                echo "Run tests using Jest"
                script {
                    sh "npm install"
                    sh "npm run test"
                }
            }
            post {
                success {
                    echo "Sending email notification for successful unit tests."
                    mail to: "aliceantonita@gmail.com",
                    subject: "Jenkins Pipeline Notification: Unit Tests | Success",
                    body: "Unit tests completed successfully. Check attached logs for details."
                }
            }
        }
        stage('Code Analysis') {
            steps {
                echo "Analyzing code with SonarQube."
                // SonarQube for code analysis
                // Example: sh 'sonar-scanner'
            }
        }
        stage('Security Scan') {
            steps {
                echo "Performing security scan."
                // OWASP ZAP or SonarQube for security scanning
                // Example: sh 'zap-cli -r report.html -t http://example.com'
            }
            post {
                success {
                    echo "Sending email notification."
                    mail to: "aliceantonita@gmail.com",
                    subject: "Jenkins Pipeline Notification: Security Scan | Success",
                    body: "Security scan completed with status: Success. Check attached logs for details."
                }
            }
        }
        stage('Deploy to Staging') {
            steps {
                echo "Deploying to AWS EC2 staging server."
                // AWS CLI or custom deployment script for deploying to staging
                // Example: sh 'aws deploy ...'
            }
        }
        stage('Integration Tests on Staging') {
            steps {
                echo "Running integration tests on the staging server."
                // Selenium or Postman for integration tests
                // Example: sh 'newman run collection.json'
            }
        }
        stage('Deploy to Production') {
            steps {
                echo "Deploying to AWS EC2 production server."
                // AWS CLI or custom deployment script for deploying to production
                // Example: sh 'aws deploy ...'
            }
        }
    }
    post {
        always {
            echo "Cleaning up after the pipeline execution!!"
        }
    }
}
