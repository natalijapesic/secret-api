use crate::{
    exam::{self, RequestExam},
    ipfs::IpfsInfo,
    merkle_tree::{MerkleAuth, MerkleTreeInfo},
    msg::{ExamResponse, ExecuteMsg, InstantiateMsg, QueryMsg},
    state::{add_exam, load, load_exam, save, update_exam, valid_exam, PARLAMENT_ID},
};
use cosmwasm_std::{
    entry_point, to_binary, Addr, Binary, Deps, DepsMut, Env, MessageInfo, Response, StdError,
    StdResult, Timestamp,
};

#[entry_point]
pub fn instantiate(
    deps: DepsMut,
    _env: Env,
    info: MessageInfo,
    msg: InstantiateMsg,
) -> StdResult<Response> {
    if !msg.parlament.contains(&info.sender) {
        return Err(StdError::generic_err("Not a valid instatiate message."));
    }

    save(deps.storage, PARLAMENT_ID, &msg.parlament)?;

    Ok(Response::default())
}

#[entry_point]
pub fn query(deps: Deps, _env: Env, msg: QueryMsg) -> StdResult<Binary> {
    match msg {
        QueryMsg::GetExam { exam_id } => to_binary(&query_exam(deps, exam_id)?),
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
        ExecuteMsg::ChangeTime { exam_id, time } => try_change_time(
            deps,
            env.block.time,
            info,
            exam_id,
            Timestamp::from_seconds(time),
        ),
        ExecuteMsg::SaveExam {
            course_name,
            start_time,
            orgs,
            ipfs,
        } => try_save_exam(
            deps,
            info,
            course_name,
            Timestamp::from_seconds(start_time),
            orgs,
            ipfs,
        ),
        ExecuteMsg::ValidateExam { exam_id } => try_validate_exam(deps, info, exam_id),
    }
}

pub fn try_validate_exam(
    deps: DepsMut,
    info: MessageInfo,
    exam_id: u64,
) -> Result<Response, StdError> {
    validate_parlament(&deps, info.sender)?;

    valid_exam(deps.storage, exam_id)?;

    Ok(Response::new())
}

fn query_exam(deps: Deps, exam_id: u64) -> StdResult<ExamResponse> {
    let exam = load_exam(deps.storage, exam_id)?;
    Ok(ExamResponse {
        exam_id: exam.id,
        ipfs: exam.ipfs,
        exam_time: exam.start_time.seconds(),
    })
}

pub fn validate_parlament(deps: &DepsMut, sender: Addr) -> Result<Response, StdError> {
    let parlament: Vec<Addr> = load(deps.storage, PARLAMENT_ID)?;

    if !parlament.contains(&sender) {
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

    if current_time.gt(&time) {
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

    if !current_time.lt(&exam.start_time.minus_seconds(900)) && exam.start_time.gt(&current_time) {
        return Err(StdError::generic_err(format!(
            "You can only start the exam 15 minutes before the start time. Start time is: {}",
            exam.start_time.seconds()
        )));
    }

    Ok(Response::new().set_data(to_binary(&ExamResponse {
        exam_id,
        ipfs: exam.ipfs,
        exam_time: exam.start_time.seconds(),
    })?))
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
