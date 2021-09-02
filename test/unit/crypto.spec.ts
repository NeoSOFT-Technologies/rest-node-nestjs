import { decrypt, encrypt } from '@app/core/crypto/crypto';

describe('Testing Encryption-Decryption', () => {
  it('Testing for text', () => {
    const data = 'This data is to be encrypted';
    const encrypted = encrypt(data);
    const decrypted = decrypt(encrypted);

    expect(decrypted).toEqual(data);
  });
  it('Testing for array', () => {
    const data = ['this', 'is', 'array'];
    const encrypted = encrypt(data);
    const decrypted = decrypt(encrypted);

    expect(decrypted).toEqual(data);
  });
  it('Testing for object', () => {
    const data = {
      key1: 'value1',
      key2: 'value2',
    };
    const encrypted = encrypt(data);
    const decrypted = decrypt(encrypted);

    expect(decrypted).toEqual(data);
  });
});
