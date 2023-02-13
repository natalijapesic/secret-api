import { Test, TestingModule } from '@nestjs/testing';
import sha256 from 'crypto-js/sha256';
import MerkleTree from 'merkletreejs';
import { ExamService } from 'modules/exam/exam.service';
import { authResponse } from 'shared/services/merkleTree';

describe('ExamService', () => {
  it('should be defined', () => {
    const leaves: string[] = [];

    leaves.push('a');
    leaves.push('b');
    leaves.push('c');

    const tree = new MerkleTree(leaves, sha256, { hashLeaves: false });

    console.log(tree.getRoot().toString('binary'));
    console.log(tree.getProof('a'));
  });
});
