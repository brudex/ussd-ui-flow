var async = require('async');
var ussd_banking_utils = require('./ussd_banking_utils');
const actionName = "transferZenith";

function doFundsTransfer(transaction,inputData,params,user,callback){
    var resthandler = params.resthandler;
    var logger = params.logger;
    var reference = params.reference;
    var payload = {
        "transferRequest": {
            "fromAcct": user.accountNumber,
            "toAcct": inputData.account,
            "amt": inputData.amount,
            "description": ""
        }
    };
    logger.info('Funds Transfer payload is >>>>',payload);
    logger.info('Funds Transfer reference number is >>>>',reference);
    var config = {
        url : "http://172.19.1.26:9480/xapi-api-service/rest/transfer",
        headers : {"Authorization":"Basic dGlnb191c2VyOnRpZ29fUGFzcw=="}
    };
    resthandler.doPost(payload,config,function(error,body){
        var response={};
        logger.info('Transfer Response from xapi >>> ',body);
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
        if(typeof  body === 'string'){
            try{
                var json = JSON.parse(body);
                if(json.transferResponse){
                    response.status ="SUCCESS";
                    response.message =json.transferResponse.message;
                    response.referenceNumber= json.transferResponse.referenceNo;
                }else{
                    response.status ="FAILED";
                }
            }catch(ex){
                response.status ="FAILED";
                var arr= body.split('|');
                response.message = body;
                if(arr.length > 1){
                    response.message = arr[1];
                }
                logger.error('Funds Transfer error >>>',ex);
            }
        }else{
            response.status ="SUCCESS";
            response.message =body.transferResponse.message;
            response.referenceNumber= body.transferResponse.referenceNo;
        }
        transaction.providerReference = response.referenceNumber;
        transaction.status = response.status;
        transaction.statusMessage = response.message;
        transaction.responseMessage = response.message;
        transaction.save();
        callback(response);
    })
}


function handleRequest(params,callback){
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
      function(ussdTrans,inputData,user,done){
          var isNumberAmount =  ussd_banking_utils.validateAmount(inputData.amount,ussd_banking_utils.config.maxTransferAmount);
          var response ={};
          if(isNumberAmount){
              if(!isNumberAmount.valid){
                  ussdTrans.status = 'FAILED';
                  ussdTrans.statusMessage = 'Invalid Amount Entered,'+isNumberAmount.message;
                  response.status = 'FAILED';
                  response.message ='Invalid Amount Entered, ' + isNumberAmount.message;
                  return callback(response);
              }else{
                  done(null,ussdTrans,inputData,user);
              }
          }else{
              ussdTrans.status = 'FAILED';
              ussdTrans.statusMessage = 'Invalid Amount Entered';
              response.status = 'FAILED';
              response.message ='Invalid Amount Entered';
              return callback(response);
          }
      },
      function (ussdTrans,inputData,user,done){
          doFundsTransfer(ussdTrans,inputData,params,user,function(result){
                callback(result);
          });
      }
  ])
}

module.exports = {
    actionName: actionName,
    handleRequest: handleRequest

};