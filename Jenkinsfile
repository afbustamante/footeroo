def VERSION = "${env.BUILD_NUMBER}"
def DIST_ARCHIVE = "dist.v${VERSION}"

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
                sh 'rm -rf dist node_modules npm-cache'
                sh 'npm cache clean --force'

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
                // Workaround for Node Error on build: The Angular Compiler requires TypeScript >=4.4.2 and <4.7.0 but 4.8.4 was found instead
                sh 'npm install typescript@4.6.4 --save-dev'
                // Run the build task in DEV mode
                sh 'npm run build'
                // Run the build task in PROD mode
                sh 'npm run build --omit=dev'
            }
            post {
                success {
                    sh "cd dist && zip -r ../${DIST_ARCHIVE}.zip . && cd .."
                    // archiveArtifacts artifacts: "${DIST_ARCHIVE}.zip", fingerprint: true
                    archiveArtifacts artifacts: 'dist/', fingerprint: true
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
    }
}
