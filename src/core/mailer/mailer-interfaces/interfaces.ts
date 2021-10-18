export interface IMailConfig {
  fromEmail: string;
  host: string;
  port: number;
  secure: boolean;
  auth: IMailAuth;
}

interface IMailAuth {
  username: string;
  password: string;
}

export interface IMailResponse {
  success: boolean;
  message?: string;
  item?: any;
  error?: any;
}

export interface IMailOptions {
  subject: string;
  templateName?: string;
  body?: string;
  htmlBody?: string;
  replace?: any;
  to?: string;
}
