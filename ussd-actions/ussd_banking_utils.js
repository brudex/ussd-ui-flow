/**
 * Created by 2016015 on 17/07/2016.
 */

var config ={
  xapiUrl:'http://172.19.1.26:9480',
  xapiAuth:'Basic dGlnb191c2VyOnRpZ29fUGFzcw==',
  vasgateUrl:'http://localhost:12515',//http://172.19.50.50/vasgate',
  vasgateApiKey:'MTN:2ct80rS6OhXNxJ7P82P5Ae13YZ2BbY9Q',//'rr5Jay76K8oUCLZ8XNX72R6i0gLbMEK1lRLgX4D6v7v8h800JT0l05o2R7QT5PHU',
  'maxTransferAmount':500,
  'maxTopupAmount':10,
  'maxBillPaymentAmount':400
};



function getUserRegistrationByMobile(db,mobile,callback){
    db.UssdBankingUser.findAll({where:{mobile:mobile}})
        .then(function(users){
            if(users.length > 0){
                callback(users[0]);
            }else{
                callback(null);
            }

        })
}

function validateAmount(amount,max){

    if(isNaN(amount)){
        return false;
    }
    if(amount!=null){
        var number =Number(amount);
        if(number > 0 ){
            if(max){
                if(amount > max){
                    return {'valid':false,'message':'The maximum allowed amount is '+max}
                }
                return {valid:true}
            }
            return {valid:true}
        }else{
            return false;
        }
    }else{
           return false;
    }
}

function createUssdTransaction(actionName,data,params,user,callback){
    var model ={};
    var db = params.db;
    var reference = params.reference;
    var sessionId = params.sessionData.sessionId;
    model.actionName = actionName;
    model.mobile = user.mobile;
    model.accountNumber = user.accountNumber;
    model.status = 'PENDING';
    model.transactionId = reference;
    model.sessionId = sessionId;
    model.inputValues = JSON.stringify(data);
    db.UssdBankingTransaction.create(model)
        .then(function(transaction){
            callback(transaction);
        })
}


function translateInputValues (valueMap,inputData,callback){
    var data = {};
    console.log('the value map is  >>> ');
    console.log(valueMap);
    for(var key in inputData){
        console.log('The key is >> '+key);
        if(inputData.hasOwnProperty(key)){
            var map = valueMap[key];
            var input = ''+inputData[key];
            if(map){
                if( map[input]){
                    data[key]= map[input]
                }else{
                    data[key]= inputData[key];
                }
            }else{
                data[key]= inputData[key];
            }

        }
    }
    console.log('Final translated values >>>> ');
    console.log(data);
    callback(data);
}

function verifyPin (user,inputData,callback){
    console.log('User pin is >>>>',user.pin);
    console.log('Input data pin is >>>>',inputData.pin);
    if(user){
        if(user.pin === inputData.pin){
           return callback(true);
        }
    }
    callback(false);
}

module.exports ={
    getUserRegistrationByMobile:getUserRegistrationByMobile,
    createUssdTransaction:createUssdTransaction,
    translateInputValues :translateInputValues,
    verifyPin :verifyPin,
    config:config,
    validateAmount:validateAmount
};