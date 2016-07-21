var async = require('async');
var ussd_banking_utils = require('./ussd_banking_utils');
const actionName = "openAccount";

function doAccountOpen(transaction,inputData,params,callback){

    var logger = params.logger;
    logger.info('Account Opening Request >>>',inputData);
    var result = {};
    result.status ='SUCCESS';
    result.message = 'You request has been received. Customer service will call you soon to open the account';
    transaction.status = result.status;
    transaction.responseMessage = result.message;
    transaction.statusMessage = result.message;
    logger.info('Account Opening Request Response >>>',result);
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
          doAccountOpen(ussdTrans,inputData,params,function(result){
                callback(result);
          });
      }
  ])
}

module.exports = {
    actionName: actionName,
    handleRequest: handleRequest
};