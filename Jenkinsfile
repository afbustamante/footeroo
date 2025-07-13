pipeline {
    agent {
        label 'jenkins-agent-1'
    }

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
            steps {
                // Get code from GitHub repository
                // git branch: 'master', url: 'https://github.com/afbustamante/footeroo'
                echo 'Pulling branch ' + env.GIT_BRANCH

                // Clean the workspace
                sh 'rm -rf dist node_modules npm-cache package-lock.json'
                sh 'docker pull node:18.18.2'
                sh 'docker run -it --rm --entrypoint sh node:18.18.2'
                sh 'npm cache clean --force'

                // Prepare Angular dependencies
                sh 'npm install'
            }
        }
        stage('Validate') {
            steps {
                // Run TS Lint
                sh 'npm run lint'
            }
        }
        stage('Build') {
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
            steps {
                script {
                    if (env.BRANCH_NAME == 'develop') {
                        // Scan for quality issues
                        sh 'docker pull sonarsource/sonar-scanner-cli:5.0.1'
                        sh 'docker run -it --rm --entrypoint sh sonarsource/sonar-scanner-cli:5.0.1'
                        configFileProvider([configFile(fileId: 'bad0cf67-d3d2-4731-a029-f30599bdc7f3', variable: 'SONAR_CONFIG')]) {
                            def props = readProperties file: "${SONAR_CONFIG}"
                            sh "sonar-scanner -Dsonar.organization=${props['sonar.organization']} -Dsonar.login=${props['sonar.token']}"
                        }
                    } else {
                        echo "Skipped Sonar analysis on this branch: ${env.BRANCH_NAME}"
                    }
                }
            }
        }
    }
}
