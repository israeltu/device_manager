const _ = require("lodash");
const { nowAsString } = require("../utils/date");
const {MissingPropertyError}=require("../utils/errors")
const DEVICE_KEY_FIELDS = ["id", "crane_id","s_n","model","description"];


class Device {
    constructor(plainDevice) {
        this._validate(plainDevice);

        if (!plainDevice){
            plainDevice = {};
        }

        let created = plainDevice.created;
        if (!created){
            created = nowAsString();
        }
        
        Object.assign(this, {
            ...plainDevice,
            created,
        });
    }

    delete = () => { this.deleted = true; }

    doesExist = (device) => (device.id === this.id || device.s_n === this.s_n);

    toFile= () => ({..._.omit(this,["toJSON"]), deleted:!!this.deleted});

    toJSON = () => _.omit(this,["deleted"]);

    _validate = (obj) => {
        if (!obj) { return; }
        const keyFieldsPresent = DEVICE_KEY_FIELDS.every(kf => obj[kf]);
        if (!keyFieldsPresent) {
            throw new MissingPropertyError(`One of the following keys are missing: ${DEVICE_KEY_FIELDS}`)
        }
    }

}

module.exports = {
    Device
}