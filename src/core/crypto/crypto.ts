import * as crypto from 'crypto';
const inputEncoding = 'utf8';
const outputEncoding = 'base64';
const salt = 'salt';
const algorithm = 'aes-256-cbc';
const password = 'Password used to generate key';
/**
 *
 * @param {*} data
 * @param {*} forceEncrypt
 * @param {*} _replaceRegExp
 */
export const encrypt = (data: any) => {
  const envGetIV = crypto.randomBytes(16);
  const envGetSecretKey = crypto.scryptSync(password, salt, 32);
  const cipher = crypto.createCipheriv(algorithm, envGetSecretKey, envGetIV);
  let encryptedData = cipher.update(JSON.stringify(data), inputEncoding, outputEncoding);
  encryptedData += cipher.final(outputEncoding);
  const encryptedDatawithIV = [encryptedData, envGetIV];
  return encryptedDatawithIV;
};
export const decrypt = (encryptedDatawithIV: any[]) => {
  const envGetSecretKey = crypto.scryptSync(password, salt, 32);
  const data = encryptedDatawithIV[0];
  const envGetIV = encryptedDatawithIV[1];
  const decipher = crypto.createDecipheriv(algorithm, envGetSecretKey, envGetIV);
  let decryptedData = decipher.update(JSON.stringify(data), outputEncoding, inputEncoding);
  decryptedData += decipher.final(inputEncoding);
  return JSON.parse(decryptedData);
};
