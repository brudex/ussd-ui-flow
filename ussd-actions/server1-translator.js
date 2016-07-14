var logger = require("../logger");
var db = require("../models");
var utils = require("../utils");

function translateIn(req,callback){
    var  rtime = utils.getCurrentDateTime();
    var response = {
        sessionId :req.body.sessionId,
        requestTime :rtime,
        appId :"ussdbank",
        shortCode :"*701#",
        msisdn :"233246583910",
        input :"*701#",
        network :"mtn"
    };
    logger.info("Translating in request >>",req.body);
    logger.info("Engine Translation >>",response);
    callback(null,response);
}

function translateOut(engineResponse){
    logger.info("Translating out response",engineResponse);
    logger.info("Valid User",validuser);
    logger.info("Payment Data",paymentData);
    callback({status:"00"})
}


/*
* Below is what must be translated to the engine to handle request after
* a request comes in, all request must be translated to below when passing to the
* engine
* */
var engineLanguageRequestSchema ={
    sessionId :"",
    requestTime :"",
    appId :"",
    shortCode :"",
    msisdn :"",
    input :"",
    network :""
};

/*
 * Below is what the engine will return after a request is completed
 *
 * */
var engineLanguageResponseSchema ={
    sessionId :"",
    responseTime :"",
    appId :"",
    shortCode :"",
    msisdn :"",
    response :"",
    network :"",
    terminate :""
};


module.exports = {
    telco: "smsgh",
    actions: {
        translateInRequest: translateIn,
        translateOutRequest:translateOut
    }
};