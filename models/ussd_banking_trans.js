"use strict";

module.exports = function(sequelize, DataTypes) {
  var UssdBankingTransaction = sequelize.define("UssdBankingTransaction", {
    actionName: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    mobile: DataTypes.STRING,
    inputValues: DataTypes.STRING,
    returnMessage: DataTypes.STRING,
    responseMessage: DataTypes.STRING,
    transactionId: DataTypes.STRING,
    providerReference:DataTypes.STRING,
    statusMessage: DataTypes.STRING,
    status: DataTypes.STRING
  }, {


  });
  return UssdBankingTransaction;
};
