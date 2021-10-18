import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';
import Mail from 'nodemailer/lib/mailer';
import * as juice from 'juice';
import * as pug from 'pug';
import { IMailConfig, IMailOptions, IMailResponse } from './mailer-interfaces';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class EmailHandlerService {
  constructor(private readonly config: ConfigService) {}
  async sendEmail(options: IMailOptions): Promise<IMailResponse> {
    return new Promise<IMailResponse>(
      async (resolve: (value?: IMailResponse) => void, rejects: (reason?: IMailResponse) => void): Promise<void> => {
        const mailConfig: IMailConfig = {
          fromEmail: this.config.get('mailer.fromEmail'),
          host: this.config.get('mailer.host'),
          port: this.config.get('mailer.port'),
          secure: false,
          auth: {
            username: this.config.get('mailer.username'),
            password: this.config.get('mailer.password'),
          },
        };

        const server: Mail = await this.getEmailServer(mailConfig);

        server.verify(async (error, success) => {
          if (error) {
            //if error happened code ends here
            console.error(error);
          } else {
            //this means success
            console.log('users ready to mail myself');
          }
        });

        const mailOptions: Mail.Options = {
          from: mailConfig.fromEmail,
          to: options.to,
          subject: options.subject,
        };

        // if template name is exist then choose pug template from views
        if (options.templateName) {
          mailOptions.html = await this.getTemplate(options.templateName, options.replace);
          // mailOptions.text = htmlToText.fromString(mailOptions.html);
        }

        // if text body then assign as text
        if (options.body) {
          mailOptions.text = options.body;
        }

        // if html body then assign as html
        if (options.htmlBody) {
          mailOptions.html = options.htmlBody;
        }

        server.sendMail(mailOptions, (err: Error, info: nodemailer.SentMessageInfo) => {
          if (info) {
            resolve({
              success: true,
              item: info,
            });
          } else {
            rejects({
              success: false,
              error: err,
            });
          }
        });
      }
    );
  }

  private async getTemplate(templateName: string, options: any = {}): Promise<string> {
    const html: string = pug.renderFile(`${__dirname}/email-templates/${templateName}.pug`, options);
    return juice(html);
  }

  private async getEmailServer(mailConfig: IMailConfig): Promise<Mail> {
    return nodemailer.createTransport({
      host: mailConfig.host,
      port: mailConfig.port,
      secure: mailConfig.secure,
      auth: {
        user: mailConfig.auth.username,
        pass: mailConfig.auth.password,
      },
    });
  }
}
