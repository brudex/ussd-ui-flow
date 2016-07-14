var logger = require("../logger");
var newline = '\r\n';
function translateIn(req,callback){
    var body = req.body;
    var session = {};
    session.sessionId = body.SessionId;
    session.startTime  = new Date();
    session.mobile = body.Mobile;
    session.network = body.Operator;
    session.sequence = body.Sequence;
    session.input = body.Message;
    session.requestType = body.Type;
    session.serviceCode = body.ServiceCode;
    session.isFirstDial = body.Type.toLowerCase() == 'initiation';
    session.expired = false;
    callback(session);
}

function translateOut(responseData){
    logger.info("Translating out request ",responseData);
 var outResp ={};
    if(responseData.error){
        outResp.Type = 'Release';
        outResp.Message = responseData.errorMessage;
    }else{
        if(responseData.responseType == 'end'){
            outResp.Type = 'Release';
        }else if(responseData.response.responseType == 'list' || responseData.response.responseType == 'input'){
            outResp.Type = 'Response';
        }
        var resultMessage = '';
        if(responseData.response.headerText != null && responseData.response.headerText !== ''){
            resultMessage+=responseData.response.headerText + newline;
        }
        if(responseData.response.displayMenu.length >0){
           resultMessage += responseData.response.displayMenu.join(newline)
        }
        if(responseData.response.footerText != null && responseData.response.footerText !== ''){
            resultMessage+=responseData.response.footerText + newline;
        }
        outResp.Message = resultMessage;
    }
    return outResp;
}


module.exports = {
    telco: "smsgh",
    actions: {
        translateInRequest: translateIn,
        translateOutRequest:translateOut
    }
};


