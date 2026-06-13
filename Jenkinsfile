pipeline {
    agent any

    tools {
        nodejs 'nodejs'
    }

    stages {

        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
            }
        }

        stage('Generate Auth State') {
            steps {
                sh 'npm run auth'
            }
        }

        stage('Execute Tests') {
            steps {
                sh 'npm test'
            }
        }
    }

    post {
        always {
            archiveArtifacts artifacts: 'playwright-report/**', allowEmptyArchive: true
            archiveArtifacts artifacts: 'allure-results/**', allowEmptyArchive: true
        }
    }
}