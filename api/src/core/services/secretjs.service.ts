import { Injectable } from '@nestjs/common';

@Injectable()
export class SecretJsService {
  // private async initializeClient(accountAddres: string) {
  //   const CHAIN_ID = 'secretdev-1';
    
  //   const keplrOfflineSigner = window.keplr.getOfflineSignerOnlyAmino(CHAIN_ID);
  //   const client = new SecretNetworkClient({
  //     url: 'http://localhost:1317',
  //     chainId: 'secretdev-1',
  //     wallet: new KeplrWallet(),
  //     walletAddress: accountAddres
  //   });
  // }

  // public async saveExam(payload: object) {
  //   const saveExamMsg = {
  //     save_exam: {
  //       // the enum variant, but in snake case. !!!IMPORTANT
  //       ...payload,
  //     },
  //   };

  //   const { code } = await this.client.tx.compute.executeContract({
  //     contract_address: '', // LOADED FROM CONFIG
  //     msg: saveExamMsg,
  //     sender: '', // your address
  //     code_hash: '', // LOADED FROM CONFIG
  //   });
  // }
}

//docker exec -it localsecret /bin/bash

//secretd tx compute store contract.wasm --from a --gas 1000000 -y --keyring-backend test

//secretd query compute list-code
