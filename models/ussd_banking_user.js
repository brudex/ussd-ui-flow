"use strict";

module.exports = function(sequelize, DataTypes) {
  var UssdBankingUser = sequelize.define("UssdBankingUser", {
    mobile: DataTypes.STRING,
    accountNumber: DataTypes.STRING,
    accountName: DataTypes.STRING,
    pin: DataTypes.STRING
  }, {
    instanceMethods: {
    }

  });
  return UssdBankingUser;
};
