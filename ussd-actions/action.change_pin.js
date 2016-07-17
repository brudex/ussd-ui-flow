var async = require('async');
var ussd_banking_utils = require('./ussd_banking_utils');

const actionName = "changePin";

function doPinChange(transaction,inputData,params,user,callback){
    var response ={};
    if(user.pin == inputData.oldpin){
        if(inputData.newpin1 == inputData.newpin2){
            response.status ="SUCCESS";
            user.pin = inputData.newpin1;
            user.save();
            response.message= 'You pin has been changed successfully';
        }else{
            response.status ="FAILED";
            response.message= 'New pin and confirm pin do not match';
        }
    }else{
        response.status ="FAILED";
        response.message= 'Invalid pin specified';
    }

    transaction.status = response.status;
    transaction.statusMessage = response.message;
    transaction.responseMessage = response.message;
    transaction.save();
    callback(response);
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
          ussd_banking_utils.translateInputValues({},inputValues,function(inputData){
              done(null,user,inputData);
          });
      },
      function (user,inputData,done){
          ussd_banking_utils.createUssdTransaction(actionName,inputData,user,params.db,params.reference,function(ussdTrans){
                done(null,ussdTrans,inputData,user)
          })
      },
      function (ussdTrans,inputData,user,done){
          doPinChange(ussdTrans,inputData,params,user,function(result){
                callback(result);
          });
      }
  ])
}

module.exports = {
    actionName: actionName,
    handleRequest: handleRequest
};