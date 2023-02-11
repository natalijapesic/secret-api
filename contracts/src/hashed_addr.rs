use cosmwasm_std::Addr;
use rs_merkle::Hasher;
use serde::{Serialize, Deserialize};
use sha2::{digest::FixedOutput, Digest, Sha256};


#[derive(Serialize, Deserialize, Clone, Debug, PartialEq)]
pub struct HashedAddr(Addr);

impl Hasher for HashedAddr {
    type Hash = [u8; 32];

    fn hash(data: &[u8]) -> [u8; 32] {
        let mut hasher = Sha256::new();

        hasher.update(data);
        <[u8; 32]>::from(hasher.finalize_fixed())
    }
}
