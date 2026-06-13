pipeline {
    agent any

    tools {
        nodejs 'Nodejs'
    }

    stages {
        stage('Install Dependencies') {
            steps {
                sh 'npm ci'
                sh 'npx playwright install'
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
        stage('Allure Report') {
            steps {
                sh 'npm run :allure:generate'
            }
        }
    }
}