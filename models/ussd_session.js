"use strict";
module.exports = function(sequelize, DataTypes) {
    var UssdSession = sequelize.define("UssdSession", {
        appId: DataTypes.STRING,
        sessionId: DataTypes.STRING,
        actionId: DataTypes.STRING, // the action that was performed
        terminate: DataTypes.BOOLEAN, // this is what terminated the session
        mobile:DataTypes.STRING,
        network:DataTypes.STRING, //network operator(mtn,airtel etc)
        sequence:DataTypes.INTEGER,
        processedAsSingle:DataTypes.BOOLEAN,
        flowId :DataTypes.STRING,
        input:DataTypes.STRING,
        inputHolder : DataTypes.STRING,
        returnValue : DataTypes.STRING,
        requestType:DataTypes.STRING, //Initiation, Response, Timeout, Release
        expired :DataTypes.BOOLEAN
    },{

    });
    return UssdSession;
};


//session.request = {
//    SessionId: randomstring.generate(32),
//    Mobile: body.Mobile || '233244567890',
//    ServiceCode: serviceCode,
//    Type: 'Initiation',
//    Message: body.InitiationMessage || serviceCode,
//    Operator: body.Operator || body.Operator.toLowerCase() || 'mtn',
//    Sequence: 1
//};