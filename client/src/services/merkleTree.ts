import { MerkleAuth, MerkleTreeInfo } from "@/services/types";
import SHA256 from "crypto-js/sha256";
import MerkleTree from "merkletreejs";

const generateTree = (addresses: string[]): MerkleTree => {
  const leaves = addresses.map((x) => SHA256(x));
  const tree = new MerkleTree(leaves, SHA256);

  return tree;
};

const generateInfo = (
  tree: MerkleTree,
  address_count: number
): MerkleTreeInfo => {
  return {
    root: tree.getRoot().toJSON().data,
    leaves_count: address_count,
  };
};

const generateAuth = (
  tree: MerkleTree,
  address: string,
  index: number
): MerkleAuth => {
  const proof = tree.getProof(SHA256(address) as any).map((p) => p.data);
  const binProof = proof.map((single) => single.toJSON().data);
  return {
    index,
    proof: binProof,
  };
};
