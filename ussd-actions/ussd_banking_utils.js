/**
 * Created by 2016015 on 17/07/2016.
 */


function getUserRegistrationByMobile(db,mobile,callback){
    db.UssdBankingUser.find({where:{mobile:mobile}})
        .then(function(user){
            callback(user);
        })
}

function createUssdTransaction(actionName,data,user,db,reference,callback){
    var model ={};
    model.actionName = actionName;
    model.moble = user.mobile;
    model.accountNumber = user.accountNumber;
    model.status = 'PENDING';
    model.transactionId = reference;
    model.inputValues = JSON.stringify(data);
    db.UssdBankingTransactions.create(model)
        .then(function(transaction){
            callback(transaction);
        })
}


function translateInputValues (valueMap,inputData,callback){
    var data = {};
    for(var key in inputData){
        if(inputData.hasOwnProperty(key)){
            var map = valueMap[key];
            var input = inputData[key];
            if( map[input]){
                data[key]= map[input]
            }else{
                data[key]= inputData[key];
            }
        }
    }
    callback(data);
}

function verifyPin (user,inputData,callback){
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
    verifyPin :verifyPin
};