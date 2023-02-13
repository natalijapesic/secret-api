use cosmwasm_std::{Addr, Binary, Uint128};
use rs_merkle::{algorithms::Sha256, Hasher, MerkleProof};
use schemars::JsonSchema;
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq, JsonSchema)]
pub struct MerkleAuth {
    pub proof: Vec<Binary>,
    pub index: Uint128,
}

#[derive(Serialize, Deserialize, Debug, Clone, Default, PartialEq, JsonSchema)]
pub struct MerkleTreeInfo {
    pub root: [u8; 32],
    pub leaves_count: Uint128,
}

fn convert(b: Vec<Binary>) -> Vec<[u8; 32]> {
    b.into_iter()
        .map(|x: Binary| x.to_array().unwrap())
        .collect()
}

impl MerkleTreeInfo {
    pub fn new(root: [u8; 32], leaves_count: Uint128) -> Self {
        Self { root, leaves_count }
    }

    pub fn validate(&self, sender: &Addr, merkle_auth: MerkleAuth) -> bool {
        let proof_des = convert(merkle_auth.proof);

        let proof = MerkleProof::<Sha256>::new(proof_des);
        let leaf_heashes = &[Sha256::hash(sender.as_bytes())];

        proof.verify(
            self.root,
            &[merkle_auth.index.u128() as usize],
            leaf_heashes,
            self.leaves_count.u128() as usize,
        )
    }
}

#[cfg(test)]
mod test {
    use cosmwasm_std::{Addr, Binary, Uint128};
    use rs_merkle::{algorithms::Sha256, Hasher, MerkleTree};

    use crate::merkle_tree::{MerkleAuth, MerkleTreeInfo};

    #[test]
    fn test() {
        let leaves = [
            Addr::unchecked("a"),
            Addr::unchecked("b"),
            Addr::unchecked("c"),
        ]
        .into_iter()
        .map(|x| Sha256::hash(x.as_bytes()))
        .collect::<Vec<[u8; 32]>>();



        let leavess = [Addr::unchecked("b"), Addr::unchecked("c")]
            .into_iter()
            .map(|x| Sha256::hash(x.as_bytes()))
            .map(|y| Binary::from(y))
            .collect::<Vec<Binary>>();

        let merkle_tree = MerkleTree::<Sha256>::from_leaves(&leaves);

        let merkle_root = merkle_tree
            .root()
            .ok_or("couldn't get the merkle root")
            .unwrap();


        let auth = MerkleTreeInfo {
            root: merkle_root,
            leaves_count: Uint128::new(3 as u128),
        };

        assert!(auth.validate(
            &Addr::unchecked("a"),
            MerkleAuth {
                proof: leavess,
                index: Uint128::new(0 as u128),
            },
        ));
    }
}
