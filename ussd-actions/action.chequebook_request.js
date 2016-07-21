var async = require('async');
var ussd_banking_utils = require('./ussd_banking_utils');

const actionName = "chequeBookRequest";

var valuesMap = {
    leaflets:{
        "1":"50",
        "2":"150"
    }
};

function doChequeBookRequest(transaction,inputData,params,callback){
    var resthandler = params.resthandler;
    var logger = params.logger;
    var reference = params.reference;

    logger.info('Atm Card Request >>>',inputData);
    var result = {};
    result.status ='SUCCESS';
    result.message = 'You request has been received and is being processed.\n\rYou will be notified when your cheque book is ready';
    transaction.status = result.status;
    transaction.responseMessage = result.message;
    transaction.statusMessage = result.message;
    logger.info('Cheque Book Request Response >>>',result);
    transaction.save();
    callback(result);

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
          })
      },
      function (user,inputData,done){
          ussd_banking_utils.createUssdTransaction(actionName,inputData,params,user,function(ussdTrans){
              logger.info('Saved Ussed Transaction >>>>',ussdTrans.dataValues);
              done(null,ussdTrans,inputData,user);
          });
      },

      function (ussdTrans,inputData,done){
          doChequeBookRequest(ussdTrans,inputData,params,function(result){
                callback(result);
          });
      }
  ])
}

module.exports = {
    actionName: actionName,
    handleRequest: handleRequest
};