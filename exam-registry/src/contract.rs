use crate::{
    exam::{RequestExam},
    ipfs::IpfsInfo,
    merkle_tree::{MerkleAuth, MerkleTreeInfo},
    msg::{ExecuteMsg, InstantiateMsg, QueryMsg, ExamResponse},
    state::{add_exam, load_exam, update_exam, PARLAMENT_ID},
};
use cosmwasm_std::{
    entry_point, to_binary, Addr, DepsMut, Env, MessageInfo, Response, StdError, StdResult,
    Timestamp, Deps, Binary,
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
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetExam {exam_id} => to_binary(&query_exam(deps, exam_id)?),
    }
}


#[entry_point]
pub fn execute(
    deps: DepsMut,
    env: Env,
    info: MessageInfo,
    msg: ExecuteMsg,
) -> Result<Response, StdError> {
    match msg {
        ExecuteMsg::StartExam { exam_id, auth } => {
            try_start_exam(deps, env.block.time, info, exam_id, auth)
        }
        ExecuteMsg::ChangeTime { exam_id, time } => {
            try_change_time(deps, env.block.time, info, exam_id, time)
        }
        ExecuteMsg::SaveExam {
            course_name, 
            start_time,
            orgs,
            ipfs,
        } => try_save_exam(deps, info, course_name, start_time, orgs, ipfs), 
    }
}


fn query_exam(deps: Deps, exam_id: u64) -> StdResult<ExamResponse>{

    let exam = load_exam(deps.storage, exam_id)?;
    Ok(ExamResponse{exam_id: exam.id, ipfs: exam.ipfs, exam_time: exam.start_time})
}

pub fn validate_parlament(deps: &DepsMut, sender: Addr) -> Result<Response, StdError> {
    let parlament = deps.storage.get(PARLAMENT_ID).unwrap();
    if parlament != sender.as_bytes() {
        return Err(StdError::generic_err("Not valid parlament"));
    }
    Ok(Response::new())
}

pub fn try_change_time(
    deps: DepsMut,
    current_time: Timestamp,
    info: MessageInfo,
    exam_id: u64,
    time: Timestamp,
) -> Result<Response, StdError> {
    validate_parlament(&deps, info.sender)?;


    if current_time.gt(&Timestamp::from_seconds(time.nanos())) {
        return Err(StdError::generic_err("Invalid time"));
    }

    let response = update_exam(deps.storage, time, exam_id)?;
    Ok(Response::new().set_data(to_binary(&response)?))
}

pub fn try_start_exam(
    deps: DepsMut,
    current_time: Timestamp,
    info: MessageInfo,
    exam_id: u64,
    auth: MerkleAuth,
) -> Result<Response, StdError> {
    let exam = load_exam(deps.storage, exam_id)?;

    if !exam.orgs.validate(&info.sender, auth) {
        return Err(StdError::generic_err("Not a valid org."));
    }

    // if exam.start_time.lt(&current_time.plus_seconds(1)) || exam.start_time.plus_seconds(600).lt(&current_time.plus_seconds(1)) {
    //     return Err(StdError::generic_err("Invalid time. "));
    // }

    Ok(Response::new().set_data(to_binary(&ExamResponse{exam_id, ipfs: exam.ipfs, exam_time:exam.start_time})?))
}

pub fn try_save_exam(
    deps: DepsMut,
    info: MessageInfo,
    course_name: String,
    start_time: Timestamp,
    orgs: MerkleTreeInfo,
    ipfs: IpfsInfo,
) -> Result<Response, StdError> {
    validate_parlament(&deps, info.sender)?;
    let request = RequestExam {
        course_name,
        start_time,
        orgs,
        ipfs,
    };

    let response = add_exam(deps.storage, request)?;
    Ok(Response::new().set_data(to_binary(&response)?))
}