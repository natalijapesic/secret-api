use cosmwasm_std::StdError;
use thiserror::Error;

#[derive(Error, Debug, PartialEq)]
pub enum CustomContractError {
    #[error("{0}")]
    // let thiserror implement From<StdError> for you
    Std(#[from] StdError),
    // this is whatever we want
    #[error("The address is not member in organizations")]
    NotOrganizationMember,
    #[error("Time is not less then current")]
    NotValidTime,
    #[error("The address is not the parlament address")]
    NotParlamentAddress,
}
