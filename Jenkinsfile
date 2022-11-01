pipeline {
    agent none

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
            agent {
                docker {
                    image 'node:14.20.1'
                    reuseNode true
                }
            }
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
        stage('Build') {
            agent {
                docker {
                    image 'node:14.20.1'
                    reuseNode true
                }
            }
            steps {
                // Run TS Lint
                sh 'npm run lint'
                // Run the build task in DEV mode
                sh 'npm run build'
                // Run the build task in PROD mode
                sh 'npm run build --omit=dev'
            }
            post {
                success {
                    archiveArtifacts 'dist/*'
                }
            }
        }
        stage('Analyze') {
            // sonarsource/sonar-scanner-cli:latest
            agent {
                docker { image 'sonarsource/sonar-scanner-cli:latest' }
            }
            steps {
                script {
                    if (env.BRANCH_NAME == 'develop') {
                        // Scan for quality issues
                        sh 'sonar-scanner -Dsonar.organization=afbustamante-github -Dsonar.host.url=https://sonarcloud.io -Dsonar.login=f141b07519c6a6eb8ac0e400c56cfdabb1775cdc'
                    } else {
                        echo "Skipped Sonar analysis on this branch: ${env.BRANCH_NAME}"
                    }
                }
            }
        }
        stage('Deploy') {
            agent {
                docker {
                    image 'node:14.20.1'
                    reuseNode true
                }
            }
            steps {
                script {
                    if (env.BRANCH_NAME == 'develop') {
                        // Deploy the application
                        sh "rm -rf ${DESTINATION_DIR}"
                        sh "cp -r ${SOURCE_DIR} ${DESTINATION_DIR}"
                        sh "chown -R ${DESTINATION_OWNER_USER}:${DESTINATION_OWNER_GROUP} ${DESTINATION_DIR}"
                    } else {
                        echo "No deployment available for this branch: ${env.BRANCH_NAME}"
                    }
                }
            }
        }
    }
}