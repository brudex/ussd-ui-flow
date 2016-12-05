var async = require('async');
var ussd_banking_utils = require('./ussd_banking_utils');
const actionName = "transferZenith";

function doFundsTransfer(transaction,inputData,params,user,callback){
    var resthandler = params.resthandler;
    var logger = params.logger;
    var reference = params.reference;
    var payload = {
        "sourceAccount": user.accountNumber,
        "destinationAccount":inputData.account,
        "amount": inputData.amount,
        "transferDescription":"Ussd Funds Transfer Transaction Zenith to Zenith",
        "reference": reference
    };

    logger.info('Funds Transfer payload is >>>>',payload);
    logger.info('Funds Transfer reference number is >>>>',reference);
    var config = {
        url : ussd_banking_utils.config.brudexEthixServicesUrl + "/api/Transfer/TransferZenith",
        headers :  {"API-KEY":ussd_banking_utils.config.brudexEthixApiKey}
    };
    logger.info('Funds Transfer EthixServices config >>>>',config);
    async.waterfall([
        function(done){
            var response ={};
            response.status ="PENDING";
            response.message= 'You request has been received.\n\r You will receive an sms shortly.';
            transaction.status = response.status;
            logger.info('sending pending response >> ',response);
            transaction.save();
            callback(response);
            done();
        },
        function(done){
            executeRequest(function(response){
                ussd_banking_utils.sendSms(response.message,user.mobile,params);
                done();
            })
        }
    ]);

    function executeRequest(callback){
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
                response.message = 'Transaction cannot be performed at this moment please try again later';
                response.status = 'FAILED';
                transaction.status=response.status;
                transaction.statusMessage = errorDescription;
                transaction.responseMessage= response.message;
                callback(response);
                transaction.save();
                return;
            }
            if(typeof  body === 'string'){
                try{
                    var json = JSON.parse(body);

                    if(json.status =='00'){
                        response.message ='Transfer successful.'+ json.message;
                    }else{
                        response.status ="FAILED";
                        response.message ='Transfer failed. Please contact the bank for assistance.';
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
                response.referenceNumber= body.reference;
            }else{
                if(body.status === '00'){
                    response.message ='Transfer successful.'+ body.message;
                    response.status ="SUCCESS";
                }else{
                    response.status ="FAILED";
                    response.message ='Transfer failed. Please contact the bank for assistance.';
                }
                response.referenceNumber= body.reference;
            }
            transaction.providerReference = response.referenceNumber;
            transaction.status = response.status;
            transaction.statusMessage = response.message;
            transaction.responseMessage = response.message;
            transaction.save();
            callback(response);
        })
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