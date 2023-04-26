use cosmwasm_std::Addr;
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

use crate::{
    ipfs::IpfsInfo,
    merkle_tree::{MerkleAuth, MerkleTreeInfo},
};

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct InstantiateMsg {
    pub parlament: Vec<Addr>,
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum ExecuteMsg {
    ChangeTime {
        exam_id: u64,
        time: u64,
    },
    StartExam {
        exam_id: u64,
        auth: MerkleAuth,
    },
    SaveExam {
        course_name: String,
        start_time: u64,
        orgs: MerkleTreeInfo,
        ipfs: IpfsInfo,
    },
    ValidateExam {
        exam_id: u64,
    },
}

#[derive(Serialize, Deserialize, Clone, Debug, Eq, PartialEq, JsonSchema)]
#[serde(rename_all = "snake_case")]
pub enum QueryMsg {
    GetExam { exam_id: u64 },
}

#[derive(Serialize, Deserialize, Clone, Debug, PartialEq, JsonSchema)]
pub struct ExamResponse {
    pub exam_id: u64,
    pub ipfs: IpfsInfo,
    pub exam_time: u64,
}
