var async = require('async');
var ussd_banking_utils = require('./ussd_banking_utils');

const actionName = "atmCardRequest";




var valuesMap = {
    cardType:{
        "1": "EazyPay Card",
        "2": "Visa Classic Credit Card",
        "3": "Visa Platinum Card",
        "4": "Visa Debit",
        "5": "Visa Prepaid"
    }
};


function doAtmCardRequest(transaction,inputData,params,callback){
    var resthandler = params.resthandler;
    var logger = params.logger;
    var reference = params.reference;

    logger.info('Atm Card Request >>>',inputData);
    var result = {};
    result.status ='SUCCESS';
    result.message = 'You request has been received and is being processed.\n\rYou will be notified when your atm card is ready';
    transaction.status = result.status;
    transaction.responseMessage = result.message;
    transaction.statusMessage = result.message;
    logger.info('Atm Card Request Response >>>',result);
    transaction.save();
    callback(result);

}


function handleRequest(params,callback){
    var mobile = params.sessionData.mobile;
    var inputValues = params.inputValues;
  async.waterfall([
      function(done){
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
          ussd_banking_utils.createUssdTransaction(inputData,user,params.db,params.reference,function(ussdTrans){
                done(null,ussdTrans,inputData)
          });
      },

      function (ussdTrans,inputData,done){
          doAtmCardRequest(ussdTrans,inputData,params,function(result){
                callback(result);
          });
      }
  ])
}

module.exports = {
    actionName: actionName,
    handleRequest: handleRequest
};