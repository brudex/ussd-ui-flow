var async = require('async');
var ussd_banking_utils = require('./ussd_banking_utils');

const actionName = "registerUssdBanking";

function doRegistration(inputData,params,callback){
    var resthandler = params.resthandler;
    var logger = params.logger;
    var reference = params.reference;
    var response ={};
    var db= params.db;
    var model = {};
    model.mobile= params.sessionData.mobile;
    logger.info();
    model.accountNumber = inputData.account;
    if(inputData.pin1 === inputData.pin2){
        model.pin = inputData.pin1;
        validateAccountNumberWithMobile(model.accountNumber,model.mobile,function(valid){
            if(valid){
                db.UssdBankingUser.create(model)
                .then(function(user){
                    response.status = 'SUCCESS';
                    response.message = 'You have successfully registered for ussd mobile banking.\n\rYou can dial *710# for a transaction menu';
                    callback(response,user)
                });
            }else{
                response.status = 'FAILED';
                response.message = 'Invalid Account number specified';
                callback(response);
            }
            logger.info('Result from ussd banking registration >>>',response);
        });
    }else{
        logger.info('Pin confirmation do not match');
        response.status = 'FAILED';
        response.message = 'Pin confirmation does not match';
        callback(response);
    }

    function validateAccountNumberWithMobile(account,mobile,callback){
        var testAccountNumbers  = ['6090111368'];
        doBalanceRequest(account,callback);
//        if(testAccountNumbers.indexOf(account)>= 0){
//            callback(true);
//        }else{
//            callback(false);
//        }
    }

    function doBalanceRequest(accountNumber,callback){
        logger.info('Balance Enquiry reference number is >>>>',reference);
        var config = {
            url : ussd_banking_utils.config.xapiUrl+ "/xapi-api-service/rest/account-balance/"+accountNumber,
            headers : {"Authorization":ussd_banking_utils.config.xapiAuth},
            json : false
        };
        logger.info('Xapi Balance Request options >>',config);
        resthandler.doGet(config.url,config,function(error,body){
            var response={};
            logger.info('Response from xapi for balance request during registration >>> ',body);
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
                callback(false);
                return;
            }
            if(body != null){
                try{
                    var balance = '-1';
                    if(!isNaN(body.trim())){
                        callback(true);
                    }else{
                        callback(false);
                    }
                }catch(ex){
                    callback(false);
                    logger.error('Balance Enquiry error >>>',ex);
                }
            }else{
                callback(false);
            }
        });
    }
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
                  var response={};
                  response.message = "You have already registered for ussd banking. You can dial *710# for the transaction menu";
                  response.status = 'FAILED';
                  logger.info('User already registered for ussdbanking sending response >>>',response);
                 return callback(response);
              }else{
                  done(null,false);
              }
          }) ;
      },
      function (registered, done){
          ussd_banking_utils.translateInputValues({},inputValues,function(inputData){
              done(null,inputData);
          })
      },
      function (inputData,done){
          doRegistration(inputData,params,function(result,user){
              if(user){
                  done(null,user,inputData,result);
                  callback(result);
              }else{
                  callback(result);
              }
          });
      },
      function (user,inputData,result,done){
          ussd_banking_utils.createUssdTransaction(actionName,inputData,params,user,function(ussdTrans){
              logger.info('Saved Ussed Transaction >>>>',ussdTrans.dataValues);
              ussdTrans.responseMessage = result.message;
              ussdTrans.status = result.status;
              ussdTrans.save();
          });
      }

  ])
}

module.exports = {
    actionName: actionName,
    handleRequest: handleRequest
};