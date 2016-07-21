 /**
 * Created by nanasafo on 5/28/16.
 */

"use strict";
var request = require('request');
var doPost = function (payload,config,callback) {
    var options = {
        url: config.url,
        headers: config.headers,
        json: true,
        body: payload,
        method: "POST"
    };
    request(options, function(error, response, body){
        if(error){
            console.log(error);
        }
        console.log("Response headers are >>> ");
        console.log(body);
        callback(error,body);
    });
};


var doGet = function (url,config,callback) {
    var options = {
        url: url,
        json: config.json,
        method: "GET",
        headers:config.headers
    };
    request(options, function(error, response, body){
        console.log(error);
        console.log(body);
        callback(error,body);
    });
};

module.exports = {
    doPost: doPost,
    doGet: doGet
};




