pipeline {
    agent any

    options {
        timeout(time: 1, unit: 'HOURS')
        retry(3)
        disableConcurrentBuilds()
    }

    stages {
        stage('Prepare') {
            steps {
                // Get code from GitHub repository
                git branch: 'master', url: 'https://github.com/afbustamante/y-a-foot-web'
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