const fs = require("fs").promises;
var lockFileMethod = require('lockfile');
const util = require('util');

const LOCK_FILE = 'some-file.lock';
class FileHandler{  
    constructor({filePath, useRwTransaction}){
        this._validate(filePath);
        this._filePath=filePath;
        this._lockFile=util.promisify(lockFileMethod.lock);
        this._unLockFile=util.promisify(lockFileMethod.unlock);
        this._shouldLock = useRwTransaction;
    }
       
    read = async ()=>{
        try{
            if (this._shouldLock){
                await this._lockFile(LOCK_FILE,{stale:10}); 
            }
            const fileContent = await fs.readFile(this._filePath);
            return JSON.parse(fileContent);
            
        }
        catch (e){
            await this._unLockFile(LOCK_FILE);
            throw e;
        }

    }

    write= async (obj)=>{
        try{
           
            await fs.writeFile(this._filePath,JSON.stringify(obj));                
        }
        finally{
                await this._unLockFile(LOCK_FILE);
        }
    }
    
    _validate(filePath){
        if (!filePath){
            throw new Error("filePath doesnt exist");
        }

    }

}

module.exports=FileHandler;