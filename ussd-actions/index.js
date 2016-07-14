/**
 * Created by pakoto on 2/25/16.
 */
"use strict";
var fs        = require("fs");
var path      = require("path");
var controllers      = {};
fs.readdirSync(__dirname)
    .filter(function(file) {
        return (file.indexOf(".") !== 0) && (file !== "index.js");
    })
    .forEach(function(file) {
        console.log(file);
        var controller = require(path.join(__dirname, file));
        controllers[controller.telco] = controllers.actions;
    });
module.exports = {
    translator: controllers
};