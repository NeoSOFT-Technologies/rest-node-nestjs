# Mailer 

The objective of Mailer module

1) This module would support sending emails via SMTP which stands for Simple Mail Transfer Protocol. We need to provide SMTP credentials in .env in the desired format mentioned below.
2) Mailer module also supports the attachment functionality.
3) We need to define the email template folder from where we need fetch the email template.
4) Currently we support pug email templates
5) The third-party service that we are using is the nodemailer package.

# Pug
[Pug](https://www.npmjs.com/package/pug) is a high performance template engine heavily influenced by [Haml](https://haml.info/) and implemented with JavaScript for Node.js and browsers. This library is used for designing the template of the email body.

## Install Dependencies
First we need to install the nodemailer package by the following command.
```
npm install --save nodemailer
```
The below command is executed to support .ts files.
```
npm install --save @types/nodemailer
```
To install Pug template execute the following instruction.
For .js
```
npm install --save pug
```
For .ts
```
npm install --save @types/pug
```
## Configuration
To configure the SMTP service we need to add below values in the environment. The values are self explanatory.  
```
EMAIL_HOST=
EMAIL_PORT=
USER_EMAIL=
USER_PASSWORD=
```
Once the .env is setup then the values of the .env file will be imported in the application with the help of mailer.ts file present in the config directory.
```
export default registerAs('mailer', () => ({
fromEmail: process.env.USER_EMAIL,
host: process.env.EMAIL_HOST ,
port: process.env.EMAIL_PORT ,
username: process.env.USER_EMAIL ,
password: process.env.USER_PASSWORD ,
}));
```

## Usability 
Since Mailer is required in every module it is the part of the CoreModule imports.
Also it is an independent module hence a mailer.module.ts file is being created in which we have provided the EmailHandlerService.
```
@Module({
  providers: [EmailHandlerService],
  exports: [EmailHandlerService],
})
export class EmailHandlerModule {}
```
The class EmailHandlerModule can be used via importing it in any of the core module such as Users module or App module etc. Consider we want to use the Mailer module in the Users module. It can  be done simply by the below steps. First import the ```EmailHandlerModule``` in the user.module.ts file.
```
@Module({
  imports: [TypeOrmModule.forFeature([UserDbRepository]), EmailHandlerModule],
  providers: [UsersService],
  controllers: [UsersController],
})
export class UsersModule {}
```
Now since we need it in the User module we need to add the EmailHandlerService as a dependency in the user.controller.ts file.

```constructor(private readonly emailService: EmailHandlerService) {} ```

Finally to trigger an email, we need pass below parameters to sendMail function in EmailHandlerService.

In this case we are sending template as a mail.
```
 await this.emailService.sendEmail({
        to:'',
        subject:'subject',
        templateName:'sample',
        replace:{'name': ''},
 });
```
The paramenters of the ```sendEmail``` function are self explanatory. The ```templateName``` parameter defines the template od the email that we are going to send through the  ```sendEmail``` function.
The value sample is the ```sample.pug``` file which contains the template that is to be sent in the mail. The ```.pug``` should be kept in the template fol

> template: The ```.pug``` file should be kept in the template folder whose directory might be in the following format <rootdir>/src/core/mailer/template/sample.pug

At the same time if we want to send a textbody via email then it has to be defined
in as a value against the ```body``` parameter. Use the following snippet of the code.
```
 await this.emailService.sendEmail({
        to:'',
        subject:'subject',
        body:'This is email body',
 });
```
