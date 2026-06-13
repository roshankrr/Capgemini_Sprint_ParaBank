pipeline {
    agent any

    tools {
        nodejs 'Nodejs'
    }

    stages {

        // stage('Install Dependencies') {
        //     steps {
        //         sh 'npm ci'
        //     }
        // }

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
}