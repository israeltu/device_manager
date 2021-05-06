const express = require("express");
const DevicesManager = require ("../services/devices_manager");
const devices=express.Router();
const DataHandlerFactory = require("../services/data_handler_factory");
const dataHandlerFactory = new DataHandlerFactory();

devices.get("",async (req, res, next)=>{
    try{
        const deviceDataHandler = dataHandlerFactory.create(DataHandlerFactory.DATA_HANDLER_TYPES.file, false);
        const dm = await getDevicesManager(deviceDataHandler);
        res.json(dm.devices);
    } catch (e) {
        errorHandler(e, res, next);
    }
});

devices.get("/deleted",async (req, res, next)=>{
    try{
        const deviceDataHandler = dataHandlerFactory.create(DataHandlerFactory.DATA_HANDLER_TYPES.file, false);
        const dm = await getDevicesManager(deviceDataHandler);
        res.json(dm.deleted);
    } catch (e) {
        errorHandler(e, res, next);
    }
});

devices.get("/:id",async (req, res, next)=> {
    try{
        const deviceDataHandler = dataHandlerFactory.create(DataHandlerFactory.DATA_HANDLER_TYPES.file, false);
        const dm=await getDevicesManager(deviceDataHandler);
        device=dm.getById(req.params.id);
        res.json(device);
    } catch (e) {
        errorHandler(e, res, next);
    }
})



devices.post("",async (req,res,next)=>{
    try{
        const deviceDataHandler = dataHandlerFactory.create(DataHandlerFactory.DATA_HANDLER_TYPES.file, true);
        const dm = await getDevicesManager(deviceDataHandler);
        const device=await dm.create(req.body);
        deviceDataHandler.write(dm.allDevices.map(d=>d.toFile()));
        res.json(device);
    } catch(e){
        errorHandler(e, res, next);
    }
})

devices.delete("/:id",async (req,res,next)=>{
    try{
        const deviceDataHandler = dataHandlerFactory.create(DataHandlerFactory.DATA_HANDLER_TYPES.file, true);
        const dm = await getDevicesManager(deviceDataHandler);
        dm.delete(req.params.id);
        deviceDataHandler.write(dm.allDevices.map(d=>d.toFile()));
        res.status(200).send("Device deleted successfully");   
    }catch(e){
        errorHandler(e, res, next);
    }
})


async function getDevicesManager(dataHandler) {
    const deviceList = await dataHandler.read();
    return new DevicesManager(deviceList);
}

const errorHandler = (e, res, next) => {
    if (e && e.errorCode){
        res.status(e.errorCode).send(e.message);
        return;
    }
    next(e);
}
module.exports=devices;
