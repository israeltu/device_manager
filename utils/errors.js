class DeviceDoesntExistError extends Error {
    get errorCode() {return 404};
} 
class CraneDoesntExistError extends Error {
    get errorCode() {return 409};
}
class CraneIsOccupiedError extends Error{
    get errorCode() {return 409};
} 

class MissingPropertyError extends Error{
    get errorCode() {return 400};
}
class DeviceAlreadyExistError extends Error{
    get errorCode() {return 409};
}

module.exports = {
    DeviceDoesntExistError,
    CraneDoesntExistError,
    CraneIsOccupiedError,
    MissingPropertyError,
    DeviceAlreadyExistError
}