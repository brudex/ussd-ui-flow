"use strict";
module.exports = function(sequelize, DataTypes) {
    var UssdMenu = sequelize.define("UssdMenu", {
        appId: DataTypes.STRING,
        uniqueId: DataTypes.STRING,
        parentFlowId: DataTypes.STRING,
        flowId: DataTypes.STRING,
        position: DataTypes.INTEGER,
        displayText: DataTypes.STRING,
        headerText: DataTypes.STRING,
        footerText: DataTypes.STRING,
        displayType: DataTypes.STRING,
        actionName: DataTypes.STRING,
        returnValue: DataTypes.STRING,
        inputHolder: DataTypes.STRING,
        actionId: DataTypes.STRING,
        terminateOnActionFail: DataTypes.BOOLEAN,
        forceTerminate: DataTypes.BOOLEAN,
        terminate: DataTypes.BOOLEAN
    }, {
    });
    return UssdMenu;
};