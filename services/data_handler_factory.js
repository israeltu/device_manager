const FileHandler=require("./file_handler");

class DataHandlerFactory {
    static DATA_HANDLER_TYPES = {
        file:1,
    }

    create = (type, isReadOperation) => {
        switch(type){
            case(DataHandlerFactory.DATA_HANDLER_TYPES.file):
                return new FileHandler({filePath:process.env.DEVICES_JSON, useRwTransaction: isReadOperation});
            default:
                throw new Error(`Data handler type ${type} is not supported`);
        }
    }
}

module.exports = DataHandlerFactory;