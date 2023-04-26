import { IPFS } from 'ipfs-core';

export const uploadBlob = async (blob: string, client: IPFS) => {
    try {
        return await client.add(blob);
    } catch (error) {
        console.log(error);
    }
};

export const downloadBlob = async (path: string, client: IPFS) => {
    const buffer = [];
    try {
        for await (const byte of client.cat(path)) {
            buffer.push(byte);
        }

        if (!buffer) throw new Error('Buffer is empty');

        return buffer.toString();
    } catch (error) {
        console.log(error);
    }
};
