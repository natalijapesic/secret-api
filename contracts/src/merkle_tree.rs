use cosmwasm_std::{Addr, Binary};
use rs_merkle::{algorithms::Sha256, Hasher, MerkleProof};
use serde::{Deserialize, Serialize};

#[derive(Serialize, Deserialize, Debug, Clone, PartialEq)]
pub struct MerkleAuth {
    pub proof: Vec<Binary>,
    pub index: usize,
}

#[derive(Serialize, Deserialize, Debug, Clone, Default, PartialEq)]
pub struct MerkleTreeInfo {
    pub root: [u8; 32],
    pub leaves_count: usize,
}

fn convert(b: Vec<Binary>) -> Vec<[u8;32]> {
    b.into_iter().map(|x: Binary| x.to_array().unwrap() ).collect()
}

impl MerkleTreeInfo {
    pub fn new(root: [u8; 32], leaves_count: usize) -> Self {
        Self { root, leaves_count }
    }

    // &str
    pub fn validate(&self, sender: &Addr, merkle_auth: MerkleAuth) -> bool {
        let proof_des = convert(merkle_auth.proof);

        let proof = MerkleProof::<Sha256>::new(proof_des);
        let leaf_heashes = &[Sha256::hash(sender.as_bytes())];

        proof.verify(
            self.root,
            &[merkle_auth.index],
            leaf_heashes,
            self.leaves_count,
        )
    }
}

// #[test]
// fn test() {
//     let leaves = ["a", "b", "c"]
//         .into_iter()
//         .map(|x| Sha256::hash(x.as_bytes()))
//         .collect::<Vec<[u8; 32]>>();

//     let leavess = [Addr::unchecked("b"), Addr::unchecked("c")]
//         .into_iter()
//         .map(|x| Sha256::hash(x.as_bytes()))
//         .map(|y| Binary::from(y))
//         .collect::<Vec<Binary>>();



//     let merkle_tree = MerkleTree::<Sha256>::from_leaves(&leaves);
//     let merkle_root = merkle_tree
//         .root()
//         .ok_or("couldn't get the merkle root")
//         .unwrap();

//     let auth = MerkleTreeInfo {
//         root: merkle_root,
//         leaves_count: 3,
//     };

//     assert!(auth.validate(
//         "a",
//         MerkleAuth {
//             proof: leavess,
//             index: 0,
//         },
//     ));
// }
