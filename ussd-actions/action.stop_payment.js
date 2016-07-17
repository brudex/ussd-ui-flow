var async = require('async');
var ussd_banking_utils = require('./ussd_banking_utils');

const actionName = "stopChequePayment";

function doStopChequePayment(transaction,inputData,params,user,callback){
    var response ={};
    response.status ="SUCCESS";
    response.message= 'You request has been received.\n\r Payment will be stopped on cheque No. '+inputData.chequeNo;
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
      function (ussdTrans,inputData,user,done){
          doStopChequePayment(ussdTrans,inputData,params,user,function(result){
                callback(result);
          });
      }
  ])
}

module.exports = {
    actionName: actionName,
    handleRequest: handleRequest
};