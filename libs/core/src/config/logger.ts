import { format } from 'winston';
const { printf } = format;
export const customLoggerFormat = printf(
  ({ level, message, label, timestamp }: { level: string; message: string; label: string; timestamp: string }) => {
    return `${timestamp} [${label}] ${level}: ${message}`;
  }
);
