var async = require('async');
var _ = require('lodash');
var telco = require('../telco-translators');
var engine = require('./app-engine');
var logger = require("../logger");

function httpController(req, res) {
    var translatorName = req.params['telco'];
    //select telco translator
    logger.info('Using translator >>> ' , translatorName);
    console.log(telco);
    var translator = telco.translator[translatorName];
    async.waterfall([
        function ( done) {
            translator.translateInRequest(req,function(engineLanguage){
                logger.info('EngineLanguage >>>',engineLanguage);
                done(null, engineLanguage);
            });
        },
        function (engineLanguage, done) {
           logger.info('Handling request to engine >>>');
           engine.handleRequest(engineLanguage,function(response){
               logger.info('Response from engine >>>');
                done(null,response)
            });
        },
        function (response, done) {
            logger.info('Translating out response >>>');
            var telcoLanguage = translator.translateOutRequest(response);
            logger.info('Response Translated as >>>',telcoLanguage);
            res.send(telcoLanguage);
        }
    ]);
}

module.exports = {
    handleRequest: httpController
};