var async = require('async');
var ussd_banking_utils = require('./ussd_banking_utils');

const actionName = "airtimeTopup";

var valuesMap = {
    network:{
        "1":"MTN",
        "2":"AIRTEL",
        "3":"VODAFONE",
        "4":"TIGO",
        "5":"GLO"
    }
};


function doAirtimeTopup(transaction,topupData,params,callback){
    var resthandler = params.resthandler;
    var logger = params.logger;
    var reference = params.reference;

    var networks = {
        "MTN":"MTN_GH",
        "AIRTEL":"AIRTEL_GH",
        "VODAFONE":"VODA_GH",
        "TIGO":"TIGO_GH",
        "GLO":"GLO_GH"
    };
    var serviceType = networks[topupData.network];
    var payload = {
        "serviceType": serviceType,
        "bankAccountNumber": transaction.accountNumber,
        "serviceAccountNumber": topupData.mobile,
        "amount": topupData.amount,
        "referenceNumber": reference,
        "transId": reference
    };
    var config = {
        url : ussd_banking_utils.config.vasgateUrl +'/api/ExpressPay/MakePayment',
        headers : {"API-KEY":ussd_banking_utils.config.vasgateApiKey}
    };
    logger.info('Doing vasgate request for airtime topup >>',payload);

    resthandler.doPost(payload,config,function(error,body){
        var response={};
        if(error){
            logger.error('Error doing ussd transaction>>> '+actionName,error);
            var errorDescription ;
            if(typeof error == 'string'){
                errorDescription= error;
            }else{
                errorDescription= JSON.stringify(error);
            }
            response.message = 'Request could not be completed at this time.\n\rPlease try again later';
            response.status = 'FAILED';
            transaction.status=response.status;
            transaction.statusMessage = errorDescription;
            transaction.responseMessage = response.message;
            transaction.save();
            callback(response);
            return;
        }
        logger.info('Response from vasgate >>> ',body);
        if(body.status === '00' || body.status=='0'){
            response.status = "SUCCESS";
            response.message = 'Request received. Your transaction is being processed.'
        }else{
          response.status= "FAILED";
          response.message = 'Request could not be completed at this time.\n\rPlease try again later';
        }
       if(body.message){
           response.message = body.message;
       }
        logger.info('Final result >>> ',response);
        transaction.providerReference = body.referenceNumber;
        transaction.status = response.status;
        if(response.message && response.message.length > 150){
            response.message = response.message.substr(0,150)
        }
        transaction.statusMessage = response.message;
        transaction.save();
        callback(response);
    })
}


function handleRequest(params,callback){
    var logger = params.logger;
    var mobile = params.sessionData.mobile;
    var inputValues = params.inputValues;
    logger.info('Handler request for >>>',actionName);
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
          ussd_banking_utils.translateInputValues(valuesMap,inputValues,function(inputData){
              done(null,user,inputData);
          })
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
          })
      },
      function(ussdTrans,inputData,user,done){
          var isNumberAmount =  ussd_banking_utils.validateAmount(inputData.amount,ussd_banking_utils.config.maxTopupAmount);
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
          doAirtimeTopup(ussdTrans,inputData,params,function(result){
                callback(result);
          });
      }
  ])
}

module.exports = {
    actionName: actionName,
    handleRequest: handleRequest
};