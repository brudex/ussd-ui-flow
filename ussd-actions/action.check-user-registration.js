var async = require('async');
var ussd_banking_utils = require('./ussd_banking_utils');

const actionName = "checkUserRegistration";


function handleRequest(params,callback){
    var logger = params.logger;
    var mobile = params.sessionData.mobile;
    var inputValues = params.inputValues;
  async.waterfall([
      function(done){
          logger.info('Checking if user is registered for ussd >>>',mobile);
          ussd_banking_utils.getUserRegistrationByMobile(params.db,mobile,function(user){
              var response={};
              if(user){
                  response.message = 'User already registered for ussd banking showing menu';
                  response.status = 'SUCCESS';
                  logger.info('User already registered for ussd banking showing menu >>>',response);
                  return callback(response);
              }else{
                  response.message = "You have not registered for ussd banking. Please dial *710*00# to register";
                  response.status = 'FAILED';
                  logger.info('User not registered for ussd banking >>>',response);
                  return callback(response);
              }
          }) ;
      }
  ])
}

module.exports = {
    actionName: actionName,
    handleRequest: handleRequest
};