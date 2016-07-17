var async = require('async');
var ussd_banking_utils = require('./ussd_banking_utils');
const actionName = "billPayment";


var valuesMap = {
    network:{
        "1":"DSTV",
        "2":"GOTV",
        "3":"ECG",
        "4":"MTNPOSTPAID",
        "5":"VODAFONEADSL"
    }
};

function doBillPayment(transaction,inputData,params,callback){
    var resthandler = params.resthandler;
    var logger = params.logger;
    var reference = params.reference;

    var networks = {
        "DSTV":"DSTV",
        "GOTV":"GOTV",
        "ECG":"ECG_POSTPAID"
//        "MTNPOSTPAID":"MTNPOSTPAID",
//        "VODAFONEADSL":"VODAFONEADSL"
    };
    var serviceType = networks[inputData.network];
    var payload = {
        "serviceType": serviceType,
        "bankAccountNumber": transaction.accountNumber,
        "serviceAccountNumber": inputData.mobile,
        "amount": inputData.amount,
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
        callback(result);
    })
}





function handleRequest(params,callback){
    var mobile = params.sessionData.mobile;
    var inputValues = params.inputValues;
    async.waterfall([function(done){
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
        function (ussdTrans,inputData,done){
            doBillPayment(ussdTrans,inputData,params,function(result){
                callback(result);
            });
        }

    ])
}

module.exports = {
    actionName: actionName,
    handleRequest: handleRequest

};