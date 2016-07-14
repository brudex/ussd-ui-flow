"use strict";
module.exports = function(sequelize, DataTypes) {
    var UssdApp = sequelize.define("UssdApp", {
        appId: DataTypes.STRING,
        description: DataTypes.STRING,
        shortCode: DataTypes.STRING,
        listId: DataTypes.STRING,
        actionId: DataTypes.STRING,
        actionType: DataTypes.STRING,
        terminate: DataTypes.BOOLEAN,
        headerText: DataTypes.STRING,
        footerText : DataTypes.STRING
    }, {
    });
    return UssdApp;
};
