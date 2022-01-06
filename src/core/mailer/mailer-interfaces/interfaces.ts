export interface IMailConfig {
  fromEmail: string;
  host: string;
  port: number;
  // secure: boolean;
  auth: IMailAuth;
}

interface IMailAuth {
  user: string;
  pass: string;
}

export interface IMailResponse {
  success: boolean;
  message?: string;
  item?: any;
  errors?: any;
}

export interface IMailOptions {
  subject: string;
  templateName?: string;
  body?: string;
  htmlBody?: string;
  replace?: Record<string, any>;
  to?: string | Array<string>;
}
