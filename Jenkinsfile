pipeline {
  agent any

  stages {
    stage('Install Dependencies') {
      steps {
        bat 'npm install'
      }
    }

    stage('Install Browsers') {
      steps {
        bat 'npx playwright install'
      }
    }

    stage('Run Tests') {
      steps {
        bat 'npx playwright test'
      }
    }
  }

  post {
    always {
      allure([
        includeProperties: false,
        jdk: '',
        commandline: 'allure',
        results: [[path: 'allure-results']]
      ])
    }
  }
}