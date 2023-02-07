import sha256 from 'crypto-js/sha256';
import MerkleTree from 'merkletreejs';

export interface MerkleAuth {
  proof: Buffer[];
  index: number;
}

export interface MerkleTreeInfo {
  root: Buffer;
  leaves_count: number;
}

const generateTree = (leaves: string[]): MerkleTree => {
  const tree = new MerkleTree(leaves, sha256, { hashLeaves: true });

  return tree;
};

export const authResponse = (leaves: string[], address: string): MerkleAuth => {
  const tree = generateTree(leaves);
  // const proof = tree.getProof(address, 0).reduce((prev, curr) => {
  //   return [...prev, curr.data.toString('binary',0,32)];
  // }, []);

  const proof = tree.getProof(address, 0).map((p) => p.data);

  console.log('proof', proof[0].toJSON().data);

  return { proof, index: leaves.findIndex((leaf) => leaf === address) };
};

export const treeInfo = (leaves: string[]): MerkleTreeInfo => {
  const tree = generateTree(leaves);

  return { leaves_count: leaves.length, root: tree.getRoot() };
};
