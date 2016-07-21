var async = require('async');
var ussd_banking_utils = require('./ussd_banking_utils');

const actionName = "balanceEnquiry";

function doBalanceEnquiry(transaction,inputData,params,user,callback){
    var resthandler = params.resthandler;
    var logger = params.logger;
    var reference = params.reference;
    logger.info('Balance Enquiry reference number is >>>>',reference);
    var config = {
        url : "http://172.19.1.26:9480/xapi-api-service/rest/account-balance/"+user.accountNumber,
        headers : {"Authorization":"Basic dGlnb191c2VyOnRpZ29fUGFzcw=="},
        json:false
    };
    logger.info('Xapi Balance Request options >>',config);
    resthandler.doGet(config.url,config,function(error,body){
        var response={};
        logger.info('Response from xapi >>> ',body);
        if(error){
            logger.error('Error doing ussd transaction>>> '+actionName,error);
            var errorDescription ;
            if(typeof error == 'string'){
                errorDescription= error;
            }else{
                errorDescription= JSON.stringify(error);
            }
            response.message = errorDescription;
            response.status = 'FAILED';
            transaction.status=response.status;
            transaction.statusMessage = response.message;
            transaction.save();
            callback(response);
            return;
        }
        if(body != null){
            try{
              var  balance = '-1';
                if(!isNaN(body.trim())){
                      balance = body.trim();
                    response.status ="SUCCESS";
                    response.message ='You account balance is '+balance;
                }else{
                    response.status ="FAILED";
                    response.message ='Request cannot be processed at this time. Please try again later';
                }

            }catch(ex){
                response.status ="FAILED";
                response.message ='Request cannot be processed at this time. Please try again later';
                logger.error('Balance Enquiry error >>>',ex);
            }
        }else{
            response.status ="FAILED";
            response.message ='Request cannot be processed at this time. Please try again later';
        }
        transaction.status = response.status;
        transaction.statusMessage = response.message;
        transaction.responseMessage = response.message;
        transaction.save();
        callback(response);
    });
}


function handleRequest(params,callback){
    console.log(params.sessionData.mobile);
    var logger = params.logger;
    var mobile = params.sessionData.mobile;
    var inputValues = params.inputValues;

    async.waterfall([
      function(done){
          logger.info('Getting Ussd Registered User >>>',mobile);
          ussd_banking_utils.getUserRegistrationByMobile(params.db,mobile,function(user){
              if(user){
                  done(null,user);
              }else{
                  var response={};
                  response.message = "You are not registered for ussd banking. Please visit the bank to register";
                  response.status = 'FAILED';
                  callback(response);
              }
          }) ;
      },
      function (user, done){
          ussd_banking_utils.translateInputValues({},inputValues,function(inputData){
              done(null,user,inputData);
          });
      },
      function (user,inputData,done){
          ussd_banking_utils.createUssdTransaction(actionName,inputData,params,user,function(ussdTrans){
              logger.info('Saved Ussed Transaction >>>>',ussdTrans.dataValues);
              done(null,ussdTrans,inputData,user);
          });
      },
      function(ussdTrans,inputData,user,done){
          ussd_banking_utils.verifyPin(user,inputData,function(validPin){
              if(validPin){
                  done(null,ussdTrans,inputData,user)
              }else{
                  ussdTrans.status = 'FAILED';
                  ussdTrans.statusMessage = 'Invalid User pin';
                  var response ={};
                  response.status = 'FAILED';
                  response.message ='Invalid User pin';
                  return callback(response);
              }
          });
      },
      function (ussdTrans,inputData,user,done){
          doBalanceEnquiry(ussdTrans,inputData,params,user,function(result){
                callback(result);
          });
      }
  ])
}

module.exports = {
    actionName: actionName,
    handleRequest: handleRequest
};