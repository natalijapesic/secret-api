use std::any::type_name;
use cosmwasm_std::{from_binary, to_binary, StdError, StdResult, Storage, Timestamp};
use serde::{de::DeserializeOwned, Serialize};
use crate::exam::{Exam, RequestExam};

pub const PARLAMENT_ID: &[u8] = b"parlament";
pub const EXAM_NAMESPACE: &[u8] = b"exams";
pub const EXAMS_ID_COUNTER: &[u8] = b"exams:counter";


fn concat(namespace: &[u8], key: &[u8]) -> Vec<u8> {
    let mut k = namespace.to_vec();
    k.extend_from_slice(key);
    k
}

pub fn save<T: Serialize>(storage: &mut dyn Storage, key: &[u8], value: &T) -> StdResult<()> {
    storage.set(key, &to_binary(value)?);
    Ok(())
}

pub fn load<T: DeserializeOwned>(storage: &dyn Storage, key: &[u8]) -> StdResult<T> {
    from_binary(&cosmwasm_std::Binary(
        storage
            .get(key)
            .ok_or_else(|| StdError::not_found(type_name::<T>()))?,
    ))
}

pub fn add_exam(storage: &mut dyn Storage, request: RequestExam) -> StdResult<()> {
    let mut counter: u64 = load(storage, EXAMS_ID_COUNTER).unwrap_or(0);

    counter += 1;

    let exam = Exam::new(
        counter,
        request.course_id,
        request.start_time,
        // request.orgs,
        request.ipfs,
    );
    save(
        storage,
        &concat(EXAM_NAMESPACE, &counter.to_be_bytes()),
        &exam,
    )?;

    Ok(())
}

pub fn update_exam(storage: &mut dyn Storage, time: Timestamp, exam_id: u64) -> StdResult<()> {
    let mut exam = load_exam(storage, exam_id)?;

    exam.start_time = time;

    save(
        storage,
        &concat(EXAM_NAMESPACE, &exam.id.to_be_bytes()),
        &exam,
    )?;

    Ok(())
}
pub fn load_exam(storage: &dyn Storage, exam_id: u64) -> StdResult<Exam> {
    let exam = load(storage, &concat(EXAM_NAMESPACE, &exam_id.to_be_bytes()))?;
    Ok(exam)
}
