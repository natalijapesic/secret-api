import { randomBytes, createCipheriv, createDecipheriv } from 'crypto';

const algorithm = 'aes-192-cbc';

export interface EncryptedObject {
  secret: string;
  iv: string;
  encryptedContent: string;
}

export function encrypt(content: Object): EncryptedObject {
  const secret = randomBytes(12).toString('hex');
  const iv = randomBytes(8).toString('hex');

  const cipher = createCipheriv(algorithm, secret, iv);

  const encryptedData = Buffer.concat([
    cipher.update(JSON.stringify(content)),
    cipher.final(),
  ]);

  return {
    encryptedContent: encryptedData.toString('hex'),
    iv,
    secret,
  };
}

export function decrypt({
  encryptedContent: hashedContent,
  iv,
  secret,
}: EncryptedObject) {
  const decipher = createDecipheriv(algorithm, secret, iv);

  const decryptedData = Buffer.concat([
    decipher.update(hashedContent, 'hex'),
    decipher.final(),
  ]);

  return JSON.parse(decryptedData.toString());
}
