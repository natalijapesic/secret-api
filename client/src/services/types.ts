export interface ExamResponse {
  exam_id: number;
  exam_time: number;
  ipfs: Ipfs;
}

export interface Ipfs {
  path: string;
  secret: string;
  iv: string;
}

export type MerkleData = {
  root: number[];
  proof: number[][] | null;
  index: string;
};

export interface MerkleAuth {
  proof: number[][];
  index: string;
}

export interface MerkleTreeInfo {
  root: number[];
  leaves_count: string;
}

export const merkleData: MerkleData = {
  root: [],
  index: "0",
  proof: [[0]],
};

export interface SaveExam {
  course_name: string;
  start_time: number;
  orgs: MerkleTreeInfo;
  ipfs: Ipfs;
}

export interface StartExam {
  exam_id: number;
  auth: MerkleAuth;
}
