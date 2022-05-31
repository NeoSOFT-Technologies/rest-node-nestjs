### ENIVRONMENT FILES

- Environment File as the name suggests is the file in your system that describes your environment.
- Environment File container the **environment variables** which are a fundamental part of developing with Node.js application, allowing your app to behave differently based on the environment you want them to run in.
- In this file we set a variable with value and that you wouldn’t want to share with anyone, purpose of file is keep as secret and secure because in .env file we store our database password, username, API key etc.
- Wherever your app needs configuration, you use environment variables.

### Why Do we need Environment Variables
 - **Security:**  Some things like API keys should not be put in plain text in the code and thereby directly visible.
 - **Flexibility:** you can reduce conditional statements à la “If production server then do X else if test server then do Y else if localhost then do Z …”.
 - **Adoption:** Popular services like GitLab or Heroku support the usage of environment variables.

### How does a .env file looks like
- A `.env` file is more or less a plain text document. It should be placed in the root of your project. Here is an example how a .env file looks like.

```
# API
API_TOKEN=myUniqueApiToken

# Database
DATABASE_NAME=myDatabaseName
```
### How to get & set environment variables in Node.js

```
// get an environment variable
export const token = process.env['API_TOKEN'];

// set an environment variable at runtime
process.env['RANDOM_ID'] = Math.random();

```
### How to use custom environment variables in Node.

1. **Create an .env file:** The file should be placed in the root of your project

2. **Install the dotenv library:** `npm install dotenv`

3. **Install the dotenv library:** `require('dotenv').config({path: __dirname + '/.env'})`

4. Wherever you need to use environment variables (e.g. in GitLab, in Jenkins, in Heroku) you need to add your environment variables. The way depends on the platform but it is usually easy to do.

5. Optional: create a function which runs at startup of your server. It should **check whether all the required environment variables are set and throw an error otherwise**.

### Nest JS Boilerplate
- In our Nest JS Boilerplate we have currently to environment files.
- `.env` in which we have set the environment variables for our application which will be used in the development mode.

- `test.env` in this we have set the environment variables for our test environment.
#### Here is the List of the environment variables that we have used in our Nest JS Boilerplate.

- [Database Module](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/documentation/wiki/docs/environment/database.env.md)
- [Encryption Module](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/documentation/wiki/docs/environment/crypto.env.md)
- [Mailer Module](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/documentation/wiki/docs/environment/email.env.md)
- [Api Rate Limit Module](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/documentation/wiki/docs/environment/rateLimit.env.md)
- [Authentication Module](https://github.com/NeoSOFT-Technologies/rest-node-nestjs/blob/documentation/wiki/docs/environment/authentication.env.md)
