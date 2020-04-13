pipeline {
    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        retry(1)
        disableConcurrentBuilds()
    }

    stages {
        stage('Prepare') {
            steps {
                // Get code from GitHub repository
                git branch: 'master', url: 'https://github.com/afbustamante/footeroo'

                // Prepare Angular dependencies
                sh 'npm install'
            }
        }
        stage('Lint') {
            steps {
                // Run TS Lint
                sh 'ng lint'
            }
        }
        stage('Build') {
            steps {
                // Run the build task in PROD mode
                sh 'ng build --prod'
            }
        }
    }
}