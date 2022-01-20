pipeline {
    agent any
    options {
        skipStagesAfterUnstable()
    }
    stages {
        stage('package creation') {
            steps {
                sh ''' #!/bin/bash
                ssh -i /my-mumbai-key.pem ubuntu@3.12.155.68 'sudo rm -rf /opt/EmployeePayrollReactApp/*'
                ssh -i /my-mumbai-key.pem ubuntu@3.12.155.68 'sudo rm -rf /var/www/html/build/*'
                sudo scp -r  /var/lib/jenkins/workspace/ravi-test/* ubuntu@3.12.155.68:/opt/EmployeePayrollReactApp/
                echo ===> package creation on frontend server
                '''
            }
        }
        stage('Build') {
            steps {
                sh ''' #!/bin/bash
                ssh -i /my-mumbai-key.pem ubuntu@3.12.155.68 'sudo npm i; sudo npm run build'
                echo ===> Build stage
                '''
            }
        }
        stage('deploy') {
            steps {
                sh ''' #!/bin/bash
                ssh -i /my-mumbai-key.pem ubuntu@3.12.155.68 'sudo mv /opt/EmployeePayrollReactApp/build/* /var/www/html/build/'
                ssh -i /my-mumbai-key.pem ubuntu@3.12.155.68 'sudo service apache2 restart'
                echo ===> deploy stage
                '''
            }
        }
    }
}
