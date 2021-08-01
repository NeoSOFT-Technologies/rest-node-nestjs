# Mailer 

The objective of Mailer module

1) This module would support sending emails via SMTP. We need to provide SMTP credentials in .env in the desired format mentioned below.
2) Mailer module also supports the attachment functionality.
3) We need to define the email template folder from where we need fetch the email template.
4) Currently we support pug email templates

# Configuration

To configure the SMTP service we need to add below values in the environment. The values are self explanatory.  
```
DB_PORT=
MAIL_HOST=
MAIL_SECURE=
MAIL_USER=
MAIL_PASSWORD=
MAIL_PORT=
```

To configure our email template directory we need add ```EMAIL_TEMPLATE_FOLDER``` in the environment.
```
EMAIL_TEMPLATE_FOLDER=
```

## Usability 
Since Mailer is not required in every module it is not part of the CoreModule imports. To leverage the functionality you need to import the MailService and MailModule from core module

``` import { MailService } from '@libs/core/src/modules/mail/mail.service';
    import { MailModule } from '@libs/core/modules/mail/ mail.module';
 ```

Then we need to provide MailModule as a import and MailService as a provider to our Module
```
@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), **MailModule**],
  providers: [UsersService, **MailService**],
  controllers: [UsersController],
})

```
Next, we need to add MailService as dependency 

```constructor(private readonly mailService: MailService) {} ```
Finally to trigger an email, we need pass below parameters to sendMail function in MailService

```
 await this.mailService.sendMail({
        to: 'ethan.reynolds@neosofttech.com', // list of receivers
        from: 'noreply@nestjs.com', // sender address
        subject: 'Testing Nest MailerModule ✔', // Subject line
        // text: 'welcome', // plaintext body
        //html: '<b>welcome</b>', // HTML body content
        template: './templates/welcome', // HTML body content
        context: {
          name: 'Ethan Reynolds',
          phoneNo: +12653651478,
          date: new Date(),
        },
      });
```

> template: Path of email template in folder structure eg. if welcome.pug is located in <root>/templates/welcome.pug then the value would be './templates/welcome'

> context: Email template variable that need to dynamically parsed inside the email template

