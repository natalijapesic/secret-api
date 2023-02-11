use crate::{ipfs::IpfsInfo, merkle_tree::MerkleTreeInfo};
use cosmwasm_std::{Timestamp};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug)]
pub struct Exam {
    pub id: u64,
    pub course_id: u64,
    pub start_time: Timestamp,
    pub orgs: MerkleTreeInfo,
    pub ipfs: IpfsInfo,
}

pub struct RequestExam {
    pub course_id: u64,
    pub start_time: Timestamp,
    pub orgs: MerkleTreeInfo,
    pub ipfs: IpfsInfo,
}
impl Exam {
    pub fn new(
        id: u64,
        course_id: u64,
        start_time: Timestamp,
        orgs: MerkleTreeInfo,
        ipfs: IpfsInfo,
    ) -> Self {
        Self {
            id,
            course_id,
            start_time,
            orgs,
            ipfs,
        }
    }
}
