pipeline {
    agent {
        label 'agent'
    }
    tools {
        jdk 'jdk17'
        nodejs 'node16'
    }
    environment {
        //SCANNER_HOME = tool 'sonar-scanner'
        APP_NAME = "finaltodoapp"
        RELEASE = "1.0.0"
        DOCKER_USER = "georgeao"
        IMAGE_NAME = "${DOCKER_USER}/${APP_NAME}"
        IMAGE_TAG = "${RELEASE}-${BUILD_NUMBER}"
        DOCKER_REGISTRY_CREDENTIALS = 'docker' // Credentials ID for Docker registry
        GIT_REPO_NAME = "todolistapp-k8s"
        GIT_USER_NAME = "george-ajayiola"
    }
    stages {
        stage('Clean workspace') {
            steps {
                cleanWs()
            }
        }
        stage('Checkout from Git') {
            steps {
                git branch: 'main', url: 'https://github.com/george-ajayiola/todolist-app.git'
            }
        }
        
        stage('Install Dependencies') {
            steps {
                sh "npm install"
            }
        }
        
        stage("Docker Build & Push") {
            steps {
                script {
                    withDockerRegistry(credentialsId: DOCKER_REGISTRY_CREDENTIALS, toolName: 'docker') {
                        sh "docker build -t ${IMAGE_NAME} ."
                        sh "docker tag ${IMAGE_NAME} ${IMAGE_NAME}:${IMAGE_TAG}"
                        sh "docker push ${IMAGE_NAME}:${IMAGE_TAG}"
                    }
                }
            }
        }

        stage('Update Deployment File') {
            environment {
                GIT_REPO_NAME = "DevSecOps-Project"
                GIT_USER_NAME = "george-ajayiola"
            }
            steps {
                withCredentials([string(credentialsId: 'github', variable: 'GITHUB_TOKEN')]) {
                    sh '''
                        git config user.email "your-email@example.com"
                        git config user.name "Your Name"
                        BUILD_NUMBER=${BUILD_NUMBER}
                        sed -i "s/replaceImageTag/${BUILD_NUMBER}/g" kubernetes/deployment.yml
                        git add path/to/your/deployment.yml
                        git commit -m "Update deployment image to version ${IMAGE_TAG}"
                        git push https://${GITHUB_TOKEN}@github.com/${GIT_USER_NAME}/${GIT_REPO_NAME} HEAD:main
                    '''
                }
            }
        }
    }
    post {
        always {
            emailext (
                subject: "Build Status: ${currentBuild.currentResult}",
                body: """Build Details:
                         - Job Name: ${env.JOB_NAME}
                         - Build Number: ${env.BUILD_NUMBER}
                         - Build Status: ${currentBuild.currentResult}
                         - Build URL: ${env.BUILD_URL}

                         Attached are the Trivy scan results for filesystem and Docker image.""",
                to: 'your-email@example.com',
                attachmentsPattern: 'trivyfs.txt, trivyimage.txt'
            )
        }
    }
}
