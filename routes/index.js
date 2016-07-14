var httpController = require('../controllers/http.controller');
var dashboardController = require('../controllers/dashboard.controller');
var express = require('express');
var router = express.Router();
var logger = require("../logger");
var newline = '\r\n';

/* GET home page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname+'/public/index.html'));
});
router.post('/ussdgate/:telco',function(req,res){
    httpController.handleRequest(req,res);
});

router.get('/ussdgate/:telco', function(req,res){
    logger.info("Ussd Post Request");
    logger.info(req.body);
    logger.info(req.headers);
//    httpController.handleRequest(req.res);

    var menu =  ["AIRTIME TOPUP",
        "FUNDS TRANSFER ZENITH TO ZENITH",
        "FUNDS TRANSFER ZENITH TO NON-ZENITH",
        "BILL PAYMENT",
        "BALANCE ENQUIRY",
        "OTHER SERVICES",
        "STATEMENT",
        "CHANGE PIN",
        "STOP PAYMENT",
        "OPEN ACCOUNT",
        "ATM CARD REQUEST",
        "CHEQUE BOOK REQUEST"];
    var menuString = menu.join(newline);
    var response = {
        Type: 'Response',
        Message: 'Welcome to the Zenith Ussd Banking, User.' + newline
            + menuString
    };
    res.send(response);
});


router.post('/admin/manage', function(req,res){
    console.log(req.body);
//    res.json({message:"success"});
   dashboardController.doAdminAction(req,res);
});

//router.get('/signup', account.signup);
//router.post('/signup', account.create);
//router.get('/login', account.login);
//router.post('/login', account.postlogin);
//router.get('/home', account.postlogin);

module.exports = router;
