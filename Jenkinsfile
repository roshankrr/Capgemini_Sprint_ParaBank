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
                sh 'npm run allure:generate'
            }
        }
    }
    // post {
    // always {

    //     publishHTML([
    //         allowMissing: true,
    //         alwaysLinkToLastBuild: true,
    //         keepAll: true,
    //         reportDir: 'playwright-report',
    //         reportFiles: 'index.html',
    //         reportName: 'Playwright Report'
    //     ])

    //     allure([
    //         includeProperties: false,
    //         results: [[path: 'allure-results']]
    //     ])

    //     archiveArtifacts artifacts: 'allure-report/**', allowEmptyArchive: true
    // }
}
}