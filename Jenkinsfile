pipeline {
    agent any

    stages {

        stage('Install NodeJS') {
            steps {
                sh '''
                curl -fsSL https://deb.nodesource.com/setup_22.x | bash -
                apt-get update
                apt-get install -y nodejs

                node -v
                npm -v
                '''
            }
        }

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
}