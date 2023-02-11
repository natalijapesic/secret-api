use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Clone, Debug, Default, PartialEq)]
pub struct IpfsInfo {
    pub path: String,
    pub secret: String,
    pub iv: String
}
