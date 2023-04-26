import { IPFSInfo } from 'core/types/ipfs.dto';

export class UploadQuestionsResponse {
  ipfsInfo: IPFSInfo;
  organizationAddresses: string[];
}
