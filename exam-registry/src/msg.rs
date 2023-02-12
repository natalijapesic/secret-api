use cosmwasm_std::Timestamp;
use serde::{Deserialize, Serialize};

use crate::{
    ipfs::IpfsInfo,
    merkle_tree::{MerkleAuth, MerkleTreeInfo},
};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct InstantiateMsg {
    name: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    ChangeTime {
        exam_id: u64,
        time: Timestamp,
    },
    StartExam {
        exam_id: u64,
        auth: MerkleAuth,
    },
    SaveExam {
        course_id: u64,
        start_time: Timestamp,
        orgs: MerkleTreeInfo,
        ipfs: IpfsInfo,
    },
}
