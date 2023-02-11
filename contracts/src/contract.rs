use crate::errors::CustomContractError;
use crate::exam::RequestExam;
use crate::ipfs::IpfsInfo;
use crate::merkle_tree::{MerkleAuth, MerkleTreeInfo};
use crate::msg::{ExecuteMsg, InstantiateMsg};
use crate::state::{add_exam, load_exam, update_exam, PARLAMENT_ID};
use cosmwasm_std::{
    entry_point, to_binary, DepsMut, Env, MessageInfo, Response, StdResult, Timestamp, Addr,
};

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    _msg: InstantiateMsg,
) -> StdResult<Response> {
    deps.storage.set(PARLAMENT_ID, &info.sender.as_bytes());

    Ok(Response::default())
}

#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, CustomContractError> {
    match msg {
        ExecuteMsg::StartExam { exam_id, auth } => {
            try_start_exam(deps, env.block.time, info, exam_id, auth)
        }
        ExecuteMsg::ChangeTime { exam_id, time } => {
            try_change_time(deps, env.block.time, info, exam_id, time)
        }
        ExecuteMsg::SaveExam {
            course_id,
            start_time,
            orgs,
            ipfs,
        } => try_save_exam(deps, info, course_id, start_time, orgs, ipfs), //parlament
    }
}

pub fn validate_parlament(deps: &DepsMut, sender: Addr)-> Result<Response, CustomContractError> {
    let parlament = deps.storage.get(PARLAMENT_ID).unwrap();
    if parlament != sender.as_bytes() {
        return Err(CustomContractError::NotParlamentAddress);
    }
    Ok(Response::new())
}

pub fn try_change_time(
    deps: DepsMut,
    current_time: Timestamp,
    info: MessageInfo,
    exam_id: u64,
    time: Timestamp,
) -> Result<Response, CustomContractError> {
    validate_parlament(&deps, info.sender)?;

    if current_time.gt(&time) {
        return Err(CustomContractError::NotValidTime);
    }

    update_exam(deps.storage, time, exam_id)?;
    Ok(Response::new())
}

pub fn try_start_exam(
    deps: DepsMut,
    current_time: Timestamp,
    info: MessageInfo,
    exam_id: u64,
    auth: MerkleAuth,
) -> Result<Response, CustomContractError> {
    let exam = load_exam(deps.storage, exam_id)?;

    if exam.orgs.validate(&info.sender, auth) {
        return Err(CustomContractError::NotOrganizationMember);
    }

    if exam.start_time.lt(&current_time) || exam.start_time.plus_seconds(600).gt(&current_time) {
        return Err(CustomContractError::NotValidTime);
    }
    Ok(Response::new().set_data(to_binary(&exam.ipfs)?))
}

pub fn try_save_exam(
    deps: DepsMut,
    info: MessageInfo,
    course_id: u64,
    start_time: Timestamp,
    orgs: MerkleTreeInfo,
    ipfs: IpfsInfo,
) -> Result<Response, CustomContractError> {
    validate_parlament(&deps, info.sender)?;
    let request = RequestExam {
        course_id,
        start_time,
        orgs,
        ipfs,
    };
    add_exam(deps.storage, request)?;
    Ok(Response::new())
}
