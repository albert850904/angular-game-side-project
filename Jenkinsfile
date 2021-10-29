pipeline {
  agent any
  
  stages {
    stage ("build & Deploy to AWS") {
      steps {
        script {
          docker.withRegistry('https://891758083751.dkr.ecr.us-east-2.amazonaws.com/', 'ecr:us-east-2:jenkins-aws') {
            def image = docker.build('game-web')
            image.push('latest')
          }
        }
      }
    }
  }
}
