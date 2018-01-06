# SkillDebugger
Debug alexa skills for node on your local development environment.

## Prepare
1. Install [nodejs](https://nodejs.org/dist/v8.9.4/node-v8.9.4-x64.msi)
2. Install [VS Code](https://code.visualstudio.com/)
3. Install [AWS CLI](https://aws.amazon.com/de/cli/)
4. Clone this repo.
5. Open VS Code on the root folder
6. Open "Integrated Terminal"
7. Install alexa-sdk -> npm install --save alexa-sdk

## Configure AWS Lambda execution. EU (Irland), eu-west-1
1. Create a execution role [IAM->Roles](https://console.aws.amazon.com/iam/home?region=eu-west-1#/roles)
2. Add a [Users](https://console.aws.amazon.com/iam/home?region=eu-west-1#/users) and finsih'LocalDeveloper' and check 'Programmatic access'  the dialog.
3. Store 'Access key ID', 'Secret access key' and copy 'User ARN'
4. Open the previously (Step 1) created Role and select the tab 'Trust relationships' and open 'Edit Trust Relationship'
5. Add copied User ARN to "Statement:Principal:AWS" and 'Update Trust Policy'
```javascript
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "copied User ARN",
        "Service": "lambda.amazonaws.com"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```
## configure your local AWS CLI
1. start command line and execute `aws configure`
```
AWS Access Key ID [None]: YOUR Access key ID
AWS Secret Access Key [None]: YOUR Secret access key
Default region name [None]: eu-west-1
Default output format [None]: json
```
## Create a Alexa Skill
1. Create a skill with name 'SampleSkill1'
2. Create a Custom Intent named 'SampleIntent'
..

## Configure our project
..

## More
Create execution role
https://github.com/alexa/interactive-adventure-game-tool#how-to-get-started
