var winston = require('winston');
var path    = require ('path');

var logger = new(winston.Logger)({
    exitOnError: false,
    transports: [
        new(winston.transports.DailyRotateFile)({
            name:"file",
            filename: 'log.log',
            dirname: __dirname + "\\" + "logs",
            datePattern: '.yyyy-MM-dd',
            timestamp:true,
            maxsize:100480000
        }),
        new(winston.transports.Console)({
            colorize: true,
            'timestamp':true
        })
    ]
});

module.exports= logger;