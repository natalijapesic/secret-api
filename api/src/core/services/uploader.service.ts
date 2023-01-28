import { Injectable } from '@nestjs/common';
import axios from 'axios';

interface IPFSObject {
  path: string;
  secret: string;
  iv: string;
}

@Injectable()
export class IPFSService {
  private readonly BASE_URL = 'http://localhost:5000';
  constructor() {}

  async upload(content: Object): Promise<IPFSObject> {
    const { data } = await axios.post(`${this.BASE_URL}/encrypt`, content);

    return data;
  }

  async downlaod(content: IPFSObject): Promise<object> {
    return await (
      await axios.post(`${this.BASE_URL}/decrypt`, content)
    ).data;
  }
}
