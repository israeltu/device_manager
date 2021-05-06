const CranesApi = require("./cranes_api.js");
const {CraneDoesntExistError ,CraneIsOccupiedError} = require("../utils/errors");
const {NO_CRANE}=require("../config/crane_constants");
const _ = require("lodash");

class CraneValidator {

    constructor({craneId,deviceList}){
        this._cranesApi = new CranesApi();
        this._craneId=craneId;
        this._deviceList=deviceList;
    }

    validate = async ()=>{
        await this.doesCraneExist();
        this.isCraneOccupied();
    }

    doesCraneExist = async () => {
        let cranesById = this._cranesApi.cranesById;
        if (_.isEmpty(this._cranesApi.cranesListById)){
           cranesById = await this._cranesApi.getCranes(); 
        }
        if (!(cranesById[this._craneId])){
            throw new CraneDoesntExistError(`Crane id ${this._craneId} doesn't exist`);
        }
    }

    isCraneOccupied= ()=>{
        if(this._craneId===NO_CRANE){
            return;
        }
        let isCraneOccupied= this._deviceList.find(d=>d.crane_id===this._craneId);
        if(isCraneOccupied){
            throw new CraneIsOccupiedError(`There is already a device on this crane (id: ${this._craneId})`);
        }
    }
}

module.exports=CraneValidator;