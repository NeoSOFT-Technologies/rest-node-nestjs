import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

/**
 *
 * @param config
 * @param data
 * @returns string
 */
export const encrypt = (config: ConfigService, data: any): string => {
  // constant to encrypt the data
  const inputEncoding = 'utf8';
  const outputEncoding = 'base64';
  const algorithm = 'aes-256-cbc';

  // create a Cipher object, with the stated algorithm, key and initialization vector (iv).
  // @algorithm
  // @key
  // @iv
  // @options
  const cipher = crypto.createCipheriv(algorithm, config.get('crypto.secretKey'), config.get('crypto.iv'));

  // Used to update the cipher with data according to the given encoding format.
  // @data: It is used to update the cipher by new content
  // @inputEncoding: Input encoding format
  // @outputEncoding: Output encoding format
  let encryptedData = cipher.update(JSON.stringify(data), inputEncoding, outputEncoding);

  // Return the buffer containing the value of cipher object.
  // @outputEncoding: Output encoding format
  encryptedData += cipher.final(outputEncoding);

  return encryptedData;
};

/**
 *
 * @param config
 * @param data
 * @returns string
 */
export const decrypt = (config: ConfigService, data: any): string => {
  // constant to decrypt the data
  const inputEncoding = 'base64';
  const outputEncoding = 'utf8';
  const algorithm = 'aes-256-cbc';

  //  Used to create a Decipher object, with the stated algorithm, key and initialization vector i.e, (iv).
  const decipher = crypto.createDecipheriv(algorithm, config.get('crypto.secretKey'), config.get('crypto.iv'));

  // Used to update the cipher with data according to the given encoding format.
  // @data: It is used to update the cipher by new content
  // @inputEncoding: Input encoding format
  // @outputEncoding: Output encoding format
  let decryptedData = decipher.update(JSON.stringify(data), inputEncoding, outputEncoding);

  // Return the buffer containing the value of cipher object.
  // @outputEncoding: Output encoding format
  decryptedData += decipher.final(outputEncoding);

  return decryptedData;
};
