pipeline {
    agent none

    options {
        timeout(time: 30, unit: 'MINUTES')
        disableConcurrentBuilds()
        timestamps()
        buildDiscarder(logRotator(numToKeepStr: '10'))
    }

    environment {
        VERSION = "${env.BUILD_NUMBER}"
        DIST_ARCHIVE = "dist.v${VERSION}"
    }

    stages {
        stage('Prepare') {
            agent {
                docker {
                    image 'node:18.18.2'
                    reuseNode true
                }
            }
            steps {
                // Get code from GitHub repository
                // git branch: 'master', url: 'https://github.com/afbustamante/footeroo'
                echo 'Pulling branch ' + env.GIT_BRANCH

                // Clean the workspace
                sh 'rm -rf dist node_modules npm-cache package-lock.json'
                sh 'npm cache clean --force'

                // Prepare Angular dependencies
                sh 'npm install'
            }
        }
        stage('Validate') {
            agent {
                docker {
                    image 'node:18.18.2'
                    reuseNode true
                }
            }
            steps {
                // Run TS Lint
                sh 'npm run lint'
            }
        }
        stage('Build') {
            agent {
                docker {
                    image 'node:18.18.2'
                    reuseNode true
                }
            }
            steps {
                // Run the build task
                sh 'npm run build'
            }
            post {
                success {
                    // sh "cd dist && zip -r ../${DIST_ARCHIVE}.zip . && cd .."
                    // archiveArtifacts artifacts: "${DIST_ARCHIVE}.zip", fingerprint: true
                    archiveArtifacts artifacts: 'dist/', fingerprint: true
                }
            }
        }
        stage('Analyze') {
            agent {
                docker { image 'sonarsource/sonar-scanner-cli:latest' }
            }
            steps {
                script {
                    if (env.BRANCH_NAME == 'develop') {
                        // Scan for quality issues
                        configFileProvider([configFile(fileId: '8d47e8c5-f619-4f36-a1dc-590dca78adb1', variable: 'SONAR_CONFIG')]) {
                            def props = readProperties file: "${SONAR_CONFIG}"
                            sh "sonar-scanner -Dsonar.organization=afbustamante-github -Dsonar.host.url=https://sonarcloud.io -Dsonar.login=${props['sonar.login']}"
                        }
                    } else {
                        echo "Skipped Sonar analysis on this branch: ${env.BRANCH_NAME}"
                    }
                }
            }
        }
    }
}
