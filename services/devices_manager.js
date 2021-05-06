const { Device} = require("../models/device");
const CraneValidator=require("./crane_validator.js");
const {DeviceAlreadyExistError,DeviceDoesntExistError,}=require("../utils/errors.js");
const _ = require("lodash");

class DevicesManager {
    constructor(deviceList) {
        this._validate(deviceList);
        this._devices = deviceList.map(d => new Device(d));
    }
    get allDevices() {return this._devices};

    get devices() { return (this._devices.filter(d => !d.deleted)); }

    get deleted() { return (this._devices.filter(d => d.deleted)); }

    create = async (device) => {
        const d=new Device(device);
        const existingDevice = this.findDevice(d);
        const doesExist = !!existingDevice;
        if (doesExist){
            throw new DeviceAlreadyExistError(`Device ${d.id} already exist`)
        }
        await this._validateCraneForDevice(d);
        this._devices.push(d);
        return d;

    }
    getById = (id) => {
        const device = this._devices.find(d => d.id === id);
        if (!device) {
            throw new DeviceDoesntExistError(`Device ${id} does not exist`);
        }
        return device;
    }

    findDevice = (device) => {
        return this._devices.find(d => d.doesExist(device));
    }

    delete = (id) => {
            const device = this.getById(id);
            device.delete();
    }

    _validate = (deviceList) => {
        if (!Array.isArray(deviceList)) {
            throw new Error("Device list is not an array");
        }
    }

    _validateCraneForDevice = async (device) => {
        let craneId;
        if (device){
            craneId = device.crane_id;
        }
        const validator=new CraneValidator({craneId,deviceList:this.devices});
        return await validator.validate();

    }
}

module.exports=DevicesManager;