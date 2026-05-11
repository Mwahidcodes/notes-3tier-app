pipeline {
    agent any

    stages {

        stage('Clone Repository') {
            steps {
                git branch: 'main',
                url: 'https://github.com/Mwahidcodes/notes-3tier-app.git'
            }
        }

        stage('Stop Old Containers') {
            steps {
                sh 'docker compose down || true'
            }
        }

        stage('Build Docker Images') {
            steps {
                sh 'docker compose build'
            }
        }

        stage('Run Containers') {
            steps {
                sh 'docker compose up -d'
            }
        }

        stage('Show Running Containers') {
            steps {
                sh 'docker ps'
            }
        }
    }

    post {

        success {
            emailext(
                subject: 'Jenkins Build Success - Notes App',
                body: 'Deployment successful! Your 3-tier Notes App is running on AWS EC2.',
                to: 'mariawahid999@gmail.com'
            )
        }

        failure {
            emailext(
                subject: 'Jenkins Build Failed - Notes App',
                body: 'Deployment failed. Check Jenkins console output.',
                to: 'mariawahid999@gmail.com'
            )
        }
    }
}