var async = require('async');

const actionName = "airtimeTopup";

var network = {
    "1":"MTN",
    "2":"AIRTEL",
    "3":"VODAFONE",
    "4":"TIGO",
    "5":"GLO"
};


function translateInputValues (inputData){
 var data = {};
    data.network = network[inputData.network];
    data.amount = inputData.amount;
    data.mobile = inputData.mobile;
}

function doAirtimeTopup(transaction,topupData,resthandler,reference,callback){

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
        url : "http://172.19.50.50/vasgate/api/ExpressPay/MakePayment",
        headers : {"API-KEY":"PUT API KEY FOR VASGATE HERE"}
    };
    resthandler.doPost(payload,config,function(error,body){
        if(error){
            logger.error('Error doing ussd transaction>>> '+actionName,error);
            var errorDescription ;
            if(typeof error == 'string'){
                errorDescription= error;
            }else{
                errorDescription= JSON.stringify(error);
            }
            var response={};
            response.message = errorDescription;
            response.status = 'FAILED';
            transaction.status=response.status;
            transaction.statusMessage = response.message;
            transaction.save();
            callback(response);
            return;
        }
        logger.info('Response from vasgate >>> ',body);
        var result ={};
        if(body.status === '00' || body.status=='0'){
            result.status = "SUCCESS";
        }else{
            result.status= "FAILED"
        }
        result.message = body.message;
        transaction.providerReference = body.referenceNumber;
        transaction.status = result.status;
        transaction.statusMessage = result.message;
        transaction.save();
        result.status_message= body.description;
        callback(result);
    })
}


function createUssdTransaction(data,user,db,reference,callback){
    var model ={};
    model.actionName = actionName;
    model.moble = data.mobile;
    model.accountNumber = user.accountNumber;
    model.status = 'PENDING';
    model.transactionId = reference;
    model.inputValues = JSON.stringify(data);
    db.UssdBankingTransactions.create(model)
      .then(function(transaction){
          callback(transaction);
    })
}


function getUserRegistrationByMobile(db,mobile,callback){
    db.UssdBankingUser.find({where:{mobile:mobile}})
        .then(function(user){
         callback(user);
   })
}


function handleRequest(params,callback){
    var mobile = params.sessionData.mobile;
    var inputValues = params.inputValues;
  async.waterfall([function(done){
      getUserRegistrationByMobile(params.db,mobile,function(user){
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
          translateInputValues(inputValues,function(inputData){
              done(null,user,inputData);
          })
      },
      function (user,inputData,done){
          createUssdTransaction(inputData,user,params.db,params.reference,function(ussdTrans){
                done(null,ussdTrans,inputData)
          })
      },
      function (ussdTrans,done){
          doAirtimeTopup(ussdTrans,params.resthandler,params.reference,function(result){
                callback(result);
          })
      }

  ])
}

module.exports = {
    actionName: actionName,
    handleRequest: handleRequest

};