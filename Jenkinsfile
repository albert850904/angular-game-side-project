pipeline {
  agent any
  
  stages {
    stage ("build & Deploy to AWS") {
      steps {
        script {
          docker.withRegistry('891758083751.dkr.ecr.us-east-2.amazonaws.com/game-web', 'ecr:us-east-2:jenkins-aws-ecr') {
            def image = docker.build('game-web-app')
            testImage.push()
          }
        }
      }
    }
  }
}
