const express = require("express");
const health=express.Router();

health.get("/",(req,res)=> {res.status(200).send("server is UP")});
module.exports = health;