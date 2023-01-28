import { Injectable } from '@nestjs/common';
import EncryptRsa from 'encrypt-rsa';

@Injectable()
export class CryptService {
  privateKey: string;
  publicKey: string;
  rsa: EncryptRsa;

  constructor() {
    this.rsa = new EncryptRsa();

    const { privateKey, publicKey } = this.rsa.createPrivateAndPublicKeys();

    this.privateKey = privateKey;
    this.publicKey = publicKey;
  }

  encrypt(message: Object) {
    const text = JSON.stringify(message);

    return this.rsa.encryptStringWithRsaPublicKey({
      text,
      publicKey: this.publicKey,
    });
  }

  decrypt(text: string) {
    const decrypted = this.rsa.decryptStringWithRsaPrivateKey({
      text,
      privateKey: this.privateKey,
    });

    return JSON.parse(decrypted);
  }
}
