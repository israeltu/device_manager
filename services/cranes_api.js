const FileHandler=require("./file_handler");
const _ = require("lodash");

class CranesApi {
    constructor(){
        this.cranesFileHandler = new FileHandler({filePath:process.env.CRANES_JSON});
        this.cranesById = {};
    }
    get cranesListById() {return this.cranesById};

    doesCraneExist = async (craneId) => {
        let cranesById = this.cranesById;
        if (_.isEmpty(cranesById)){
           cranesById = await this.getCranes(); 
        }
        return !!(cranesById[craneId] && cranesById[craneId].length > 0); 
    }

    getCranes = async () => {
        const cranes = await this.cranesFileHandler.read();
        this.cranesById = _.groupBy(cranes);
        return this.cranesById;
    }
}

module.exports = CranesApi;