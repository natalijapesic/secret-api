import { IPFS } from 'ipfs-core';

export const uploadBlob = async (blob: string, client: IPFS) => {
  return client.add(blob);
};

export const downloadBlob = async (path: string, client: IPFS) => {
  const buffer = [];
  for await (const byte of client.cat(path)) {
    buffer.push(byte);
  }
  return buffer.toString();
};
