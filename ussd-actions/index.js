/**
 * Created by pakoto on 2/25/16.
 */
"use strict";
var fs  = require("fs");
var path = require("path");
var controllers      = {};
var utils = require("../utils");
var logger = require("../logger");
var db = require("../models");

fs.readdirSync(__dirname)
    .filter(function(file) {
        var isActionFile = file.indexOf('action.') >= 0;
        return isActionFile && (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        var controller = require(path.join(__dirname, file));
        controllers[controller.actionName] = controller.handleRequest;
    });


function handleUssdTransaction (sessionData,inputValues,actionName, callback){
    logger.info('Perforing Ussd Transaction   >>>', actionName);
    logger.info('inputValues are  >>>', inputValues);
    logger.info('Session Data is  >>>', sessionData.dataValues);
    var params ={};
    params.sessionData = sessionData;
    params.inputValues = inputValues;
    params.resthandler = utils.restHandler;
    params.reference = utils.generateTransId();
    params.db = db;
    params.logger = logger;
    controllers[actionName](params,function(result){
        logger.info('Ussd Action Result >>>',result);
        callback(result);
    });
}

module.exports = {
    handlerRequest: handleUssdTransaction
};