use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive( Serialize, Clone, Deserialize, Debug, Default, PartialEq, JsonSchema)]
pub struct IpfsInfo {
    pub path: String,
    pub secret: String,
    pub iv: String,
}


