import { Test, TestingModule } from '@nestjs/testing';
import { EmailHandlerService } from '@app/core/mailer/mailer.service';
import { CoreModule } from '@app/core/module';

jest.mock('nodemailer', () => ({
  createTransport: jest.fn().mockReturnValue({
    sendMail: jest.fn().mockImplementation((mailoptions, callback) => {
      callback(null, mailoptions);
    }),
    verify: jest.fn().mockImplementation((callback) => {
      callback();
    }),
  }),
}));

describe('Testing mailer', () => {
  let mailerService: EmailHandlerService;

  beforeAll(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [CoreModule],
      providers: [EmailHandlerService],
    }).compile();

    mailerService = module.get<EmailHandlerService>(EmailHandlerService);
  });

  it('Sending email with pug template', async () => {
    const response = await mailerService.sendEmail({
      to: 'recipient-email@example.com',
      subject: 'Email subject',
      templateName: 'sample',
      replace: { name: 'NestJs' },
    });
    expect(response.success).toBe(true);
    expect(response.item.html).toBeDefined();
  });
  it('Sending email with text body', async () => {
    const response = await mailerService.sendEmail({
      to: 'recipient-email@example.com',
      subject: 'Email subject',
      body: 'Email body',
    });
    expect(response.success).toBe(true);
    expect(response.item.text).toBeDefined();
  });

  it('Sending email with html body', async () => {
    const response = await mailerService.sendEmail({
      to: 'recipient-email@example.com',
      subject: 'Email subject',
      htmlBody: '<h3>Email body</h3>',
    });
    expect(response.success).toBe(true);
    expect(response.item.html).toBeDefined();
  });
});
