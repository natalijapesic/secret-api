import { Injectable, Logger } from '@nestjs/common';
import { SecretNetworkClient } from 'secretjs';
import { AminoWallet } from 'secretjs/dist/wallet_amino';

@Injectable()
export class SecretJsService {
  private readonly client = new SecretNetworkClient({
    url: 'https://api.pulsar.scrttestnet.com',
    chainId: 'pulsar-2',
    // wallet: new AminoWallet('fjdjfpdjfwp'),
  });

  public async saveExam(payload: object) {
    const saveExamMsg = {
      save_exam: {
        // the enum variant, but in snake case. !!!IMPORTANT
        ...payload,
      },
    };

    const { code } = await this.client.tx.compute.executeContract({
      contract_address: '', // LOADED FROM CONFIG
      msg: saveExamMsg,
      sender: '', // your address
      code_hash: '', // LOADED FROM CONFIG
    });
  }
}


//docker exec -it localsecret /bin/bash



//secretd tx compute store contract.wasm --from a --gas 1000000 -y --keyring-backend test

//secretd query compute list-code