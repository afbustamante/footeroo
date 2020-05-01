pipeline {
    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        retry(1)
        disableConcurrentBuilds()
    }

    environment {
        DEPLOYMENT_DIR = '/var/www/html'
        SOURCE_DIR = "dist/footeroo"
        DESTINATION_DIR = "${DEPLOYMENT_DIR}/footeroo"
        DESTINATION_OWNER_USER = "apache"
        DESTINATION_OWNER_GROUP = "apache"
    }

    stages {
        stage('Prepare') {
            steps {
                // Get code from GitHub repository
                git branch: 'master', url: 'https://github.com/afbustamante/footeroo'

                // Clean the workspace
                sh 'rm -rf dist'

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
                // Run the build task in DEV mode
                sh 'ng build'
                // Run the build task in PROD mode
                sh 'rm -rf dist/*'
                sh 'ng build --prod'
            }
        }
        stage('Deploy') {
            steps {
                // Deploy the application
                sh "rm -rf ${DESTINATION_DIR}"
                sh "cp -r ${SOURCE_DIR} ${DESTINATION_DIR}"
                sh "chown -R ${DESTINATION_OWNER_USER}:${DESTINATION_OWNER_GROUP} ${DESTINATION_DIR}"
            }
        }
    }
}