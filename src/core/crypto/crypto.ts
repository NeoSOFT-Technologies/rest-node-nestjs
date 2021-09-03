import * as crypto from 'crypto';
const inputEncoding = 'utf8';
const outputEncoding = 'base64';
const salt = crypto.randomBytes(64);
const algorithm = 'aes-256-gcm';
/**
 *
 * @param {*} data
 * @param {*} forceEncrypt
 * @param {*} _replaceRegExp
 */
export const encrypt = (data: any, password: string) => {
  const envGetIV = crypto.randomBytes(16);
  const envGetSecretKey = crypto.pbkdf2Sync(password, salt, 2145, 32, 'sha512');
  const cipher = crypto.createCipheriv(algorithm, envGetSecretKey, envGetIV);
  let encryptedData = cipher.update(JSON.stringify(data), inputEncoding, outputEncoding);
  encryptedData += cipher.final(outputEncoding);
  const tag = cipher.getAuthTag();
  return [encryptedData, envGetIV, tag];
};
export const decrypt = (encryptedDatawithIV: any[], password: string) => {
  const envGetSecretKey = crypto.pbkdf2Sync(password, salt, 2145, 32, 'sha512');
  const data = encryptedDatawithIV[0];
  const envGetIV = encryptedDatawithIV[1];
  const tag = encryptedDatawithIV[2];
  const decipher = crypto.createDecipheriv(algorithm, envGetSecretKey, envGetIV);
  decipher.setAuthTag(tag);
  let decryptedData = decipher.update(JSON.stringify(data), outputEncoding, inputEncoding);
  decryptedData += decipher.final(inputEncoding);
  return JSON.parse(decryptedData);
};
