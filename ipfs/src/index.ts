import { create } from 'ipfs-core';
import express, { Request, Response } from 'express';

import dotenv from 'dotenv';
import { decrypt, encrypt, EncryptedObject } from './services/crypt.service';
import { downloadBlob } from './services/ipfs.service';

dotenv.config();

const PORT = 5000;

interface IpfsContent {
  path: string;
  secret: string;
  iv: string;
}

const app = express();
app.use(express.json());

const ipfsClient = await create();

app.post('/save', async (req: Request, res: Response) => {
  const content: Object = req.body;

  const { iv, encryptedContent, secret } = encrypt(content);

  const { path } = await ipfsClient.add(encryptedContent);

  const response: IpfsContent = {
    path,
    iv,
    secret,
  };

  res.json(response);
});

app.post('/decrypt', async (req: Request, res: Response) => {
  const { path, iv, secret }: IpfsContent = req.body;

  const blob = await downloadBlob(path, ipfsClient);

  const content = decrypt({ encryptedContent: blob, iv, secret });

  res.json(content);
});

app.listen(PORT ?? 9000, async () => {
  console.log(`🚀 server started at http://localhost:${PORT}`);
});
