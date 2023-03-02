use cosmwasm_std::Timestamp;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use crate::{
    ipfs::IpfsInfo,
    merkle_tree::{MerkleAuth, MerkleTreeInfo},
};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub name: String,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
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
        course_name: String,
        start_time: Timestamp,
        orgs: MerkleTreeInfo,
        ipfs: IpfsInfo,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    GetExam {
        exam_id:u64
    },
}


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct ExamResponse {
    pub exam_id: u64,
    pub ipfs: IpfsInfo,
    pub exam_time: Timestamp
}