import { Injectable } from '@nestjs/common';
import axios from 'axios';
import { IPFSInfo } from 'core/types/ipfs.dto';

@Injectable()
export class IPFSService {
  private readonly BASE_URL = 'http://localhost:5000';
  constructor() {}

  async upload(content: Object): Promise<IPFSInfo> {
    const { data } = await axios.post(`${this.BASE_URL}/encrypt`, content);

    return data;
  }

  async downlaod(content: IPFSInfo): Promise<object> {
    return await (
      await axios.post(`${this.BASE_URL}/decrypt`, content)
    ).data;
  }
}
