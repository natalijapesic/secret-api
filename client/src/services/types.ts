export interface ExamResponse {
  exam_id: number;
  exam_time: string;
  ipfs: Ipfs;
};

export interface Ipfs{ path: string; secret: string; iv: string };

export type MerkleData = {
  root: number[];
  proof: number[][] | null;
  index: string;
};

export interface MerkleAuth {
  proof: number[][];
  index: number;
}

export interface MerkleTreeInfo {
  root: number[];
  leaves_count: number;
}

export const merkleData: MerkleData = {
  root: [],
  index: "0",
  proof: [[0]],
};

export interface SaveExam {
  course_name: string;
  start_time: string;
  orgs: MerkleTreeInfo;
  ipfs: Ipfs;

};
