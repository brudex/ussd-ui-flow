var async = require('async');
var _ = require('lodash');
var db = require('../models');
var logger = require("../logger");

function createNewUssdApp(data, res) {
    db.UssdApp.create(data);
    res.json({status: "00", message: "Ussd Short Code created successfully"})
}

function listAllUssdApps(data, res) {
    db.UssdApp.findAll().then(function (apps) {
        var list = [];
        apps.forEach(function (item) {
            var app = {};
            app.appId = item.appId;
            app.shortCode = item.shortCode;
            app.description = item.description;
            list.push(app);
        });
        var response = {};
        response.status = '00';
        response.data = list;
        res.json(response);
    });
}

function deleteUssdApp(data, res) {
    console.log("finding flows >>", data);
    db.UssdMenu.findOne({where: {appId: data}})
        .then(function (flow) {
            if (flow) {
                res.json({status: "02", message: "This app has existing ussd flows. Delete all flows before deleting this app"})
            } else {
                db.UssdApp.destroy({where: {appId: data}});
                res.json({status: "00", message: "Ussd App successfully deleted"})
            }
    });
}


function clearUssdMenuItems(data, res) {
    console.log("Deletting ussd flows >>", data);
    db.UssdMenu.destroy({where: {appId: data}})
        .then(function (flow) {
            res.json({status: "00", message: "Menu items successfully deleted"});
     });
}

function listUssdFlowForApp(data, res) {
    console.log("The data received for list ussd flows >>>> ");
    console.log(data);
    var appId = data;
    var menuItems = [];
    async.waterfall([function (done) {
        db.UssdMenu.findAll({where: {appId: appId}})  //get ussd menuItems by id
            .then(function (flows) {
                logger.info("Found ussd flows >>>>> ", flows.length);
                done(null, flows);
            })
    }, function (flows, done) {
        flows.forEach(function (item) {
            menuItems.push(item.dataValues); //get only json data without all the functions
        });
        done(null);
    }], function () {
        return res.json({status: "00", list: menuItems})
    });
}

function saveUssdFlow(data, res) {
    console.log("Saving ussd flow >>>>");
    console.log(data);
    var modifiedItems = [];
    var menuFlow = data.menuFlow;
    var menuItems = data.menuItems;
    var levelTree = '0';
    var appId = data.appId;
    traverse(levelTree, menuFlow);
    function traverse(str, menuFlow) {
        for (var p = 0, len = menuFlow.length; p < len; p++) {
            var obj = menuFlow[p];
            var item = _.find(menuItems, { 'uniqueId': obj.id });
            item.parentFlowId = str;
            item.flowId = str + '-' + item.returnValue;
            item.appId = appId;

            if(item.id){
                delete item.id;
            }
            modifiedItems.push(item);
            if (obj.children) {
                console.log('Iterating chidren');
                console.log('Children are >>');
                console.log(obj.children);
                console.log("Passing Str of value >>>" + str);
                console.log('Traversing childreing of >>' + obj.id);
                console.log('Traversing childreing of >>' + item.displayItem);
                traverse(item.flowId, obj.children);
            }
        }
    }

    async.waterfall([
        function (done) {
            db.UssdMenu.destroy({where: {appId: appId}}).then(function () {
                done(null);
            });
        },
        function (done) {
            db.UssdMenu.bulkCreate(modifiedItems).then(function () {
                done(null);
            })
        }, function () {
            return res.json({status: "00", message: "Menu Items Succesfully saved"})
        }
    ]);

}


function adminAction(req, res) {
    console.log(req.body);
    var payload = req.body;
    if (payload.action == 'createnew') {
        createNewUssdApp(payload.data, res);
    }
    if (payload.action == 'listapps') {
        listAllUssdApps(payload, res)
    }
    if (payload.action == 'deleteapp') {
        deleteUssdApp(payload.data, res)
    }
    if (payload.action == 'saveflow') {
        saveUssdFlow(payload.data, res)
    }
    if (payload.action == 'listflow') {
        listUssdFlowForApp(payload.data, res)
    }
    if (payload.action == 'clearflow') {
        clearUssdMenuItems(payload.data, res);
    }
}

module.exports = {
    doAdminAction: adminAction
};