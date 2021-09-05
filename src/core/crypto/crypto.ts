import { ConfigService } from '@nestjs/config';
import * as crypto from 'crypto';

// algorithm - AES 256 GCM Mode
const algorithm = 'aes-256-gcm';

// iterations: It must be a number and should be set as high as possible.
// So, the more is the number of iterations, the more secure the derived key will be,
// but in that case it takes greater amount of time to complete.
// number of interation - the value of 2145 is randomly chosen
const iterations = 2145;

// keylen: It is the key of the required byte length and it is of type number.
// derive encryption key: 32 byte key length
const keylen = 32;

// digest: It is a digest algorithms of string type.
const digest = 'sha512';

// salt
const salt = crypto.randomBytes(64);

/**
 *
 * @param config
 * @param data
 * @returns
 */
export const encrypt = (config: ConfigService, data: any) => {
  try {
    // constant to encrypt the data
    const inputEncoding = 'utf8';
    const outputEncoding = 'base64';

    // password - master key
    const password = config.get('crypto.secretKey');

    // random initialization vector
    const iv = crypto.randomBytes(16);

    // The method gives an asynchronous Password-Based Key Derivation
    const key: Buffer = crypto.pbkdf2Sync(password, salt, 2145, 32, 'sha512');

    // create a Cipher object, with the stated algorithm, key and initialization vector (iv).
    // @algorithm - AES 256 GCM Mode
    // @key
    // @iv
    // @options
    const cipher = crypto.createCipheriv(algorithm, key, iv);

    // cipher.update - Used to update the cipher with data according to the given encoding format.
    // @data: It is used to update the cipher by new content
    // @inputEncoding: Input encoding format
    // @outputEncoding: Output encoding format
    // cipher.final = Return the buffer containing the value of cipher object.
    // @outputEncoding: Output encoding format
    let encryptedData = cipher.update(JSON.stringify(data), inputEncoding, outputEncoding);

    // Return the buffer containing the value of cipher object.
    // @outputEncoding: Output encoding format
    encryptedData += cipher.final(outputEncoding);

    // extract the auth tag
    const tag = cipher.getAuthTag();

    // return the result
    return [encryptedData, iv, tag];
  } catch (exception) {
    throw new Error(exception);
  }
};

/**
 *
 * @param config
 * @param encryptedDatawithIV
 * @returns
 */
export const decrypt = (config: ConfigService, data: any) => {
  try {
    // constant to decrypt the data
    const inputEncoding = 'base64';
    const outputEncoding = 'utf8';

    // password - master key
    const password = config.get('crypto.secretKey');

    // derive key using; 32 byte key length
    const key = crypto.pbkdf2Sync(password, salt, iterations, keylen, digest);

    // encrypted data with iv & tag
    const text = data[0];
    const iv = data[1];
    const tag = data[2];

    // AES 256 GCM Mode
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    // set the auth tag
    decipher.setAuthTag(tag);

    // Used to update the cipher with data according to the given encoding format.
    // @data: It is used to update the cipher by new content
    // @inputEncoding: Input encoding format
    // @outputEncoding: Output encoding format
    let decryptedData = decipher.update(JSON.stringify(text), inputEncoding, outputEncoding);

    // Return the buffer containing the value of cipher object.
    // @outputEncoding: Output encoding format
    decryptedData += decipher.final(outputEncoding);

    return JSON.parse(decryptedData);
  } catch (exp) {
    throw exp;
  }
};
