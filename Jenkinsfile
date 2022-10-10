pipeline {
    agent any

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
    }

    environment {
        DEPLOYMENT_DIR = '/var/www/html'
        SOURCE_DIR = "dist/footeroo"
        DESTINATION_DIR = "${DEPLOYMENT_DIR}/footero.net"
        DESTINATION_OWNER_USER = "www-data"
        DESTINATION_OWNER_GROUP = "www-data"
    }

    stages {
        stage('Prepare') {
            steps {
                // Get code from GitHub repository
                // git branch: 'master', url: 'https://github.com/afbustamante/footeroo'
                echo 'Pulling branch ' + env.GIT_BRANCH

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
        stage('Analyze') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        // Scan for quality issues
                        sh 'sonar-scanner -Dsonar.organization=afbustamante-github -Dsonar.host.url=https://sonarcloud.io -Dsonar.login=f141b07519c6a6eb8ac0e400c56cfdabb1775cdc'
                    } else {
                        echo 'Skipped Sonar analysis on this branch'
                    }
                }
            }
        }
        stage('Deploy') {
            steps {
                script {
                    if (env.BRANCH_NAME == 'master') {
                        // Deploy the application
                        sh "rm -rf ${DESTINATION_DIR}"
                        sh "cp -r ${SOURCE_DIR} ${DESTINATION_DIR}"
                        sh "chown -R ${DESTINATION_OWNER_USER}:${DESTINATION_OWNER_GROUP} ${DESTINATION_DIR}"
                    } else {
                        echo 'No deployment available for this branch'
                    }
                }
            }
        }
    }
}