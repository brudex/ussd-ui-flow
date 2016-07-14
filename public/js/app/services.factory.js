(function () {
angular
    .module('ach.app')
    .factory('brudexservices', DataService);
DataService.$inject = ['$http', '$location'];

function DataService($http, $location) {
    var baseUrl = "/admin/manage";
    return {
        createUssd: createUssd,
        deleteUssdApp: deleteUssdApp,
        getUssdApps: getUssdApps,
        getUssdFlows: getUssdFlows,
        saveUssdFlow : saveUssdFlow,
        clearUssdFlow:clearUssdFlow
    };

    function getUssdApps(callback) {
        var payload = {};
        payload.action = "listapps";
        doPost(payload, function(err, response) {
            if (err) {
                console.log(err);
                toastr.error(err);
                return;
            }
            console.log(response);
            callback(response.data);
        });
    }

    function createUssd(data,callback){
        var payload = {};
        payload.action = "createnew";
        payload.data = data;
        doPost(payload, function (err, response) {
            if (err) {
                console.log(err);
                toastr.error(err);
                return;
            }
            callback(response.data);
        });
    }

    function clearUssdFlow(data,callback){
        var payload = {};
        payload.action = "clearflow";
        payload.data = data;
        doPost(payload, function (err, response) {
            if (err) {
                console.log(err);
                toastr.error(err);
                return;
            }
            callback(response.data);
        });
    }


    function deleteUssdApp(data,callback){
        var payload = {};
        payload.action = "deleteapp";
        payload.data = data;
        doPost(payload, function (err, response) {
            if (err) {
                console.log(err);
                toastr.error(err);
                return;
            }
            callback(response.data);
        });
    }

    function getUssdFlows(data,callback){
        var payload = {};
        payload.action = "listflow";
        payload.data = data;
        doPost(payload, function (err, response) {
            if (err) {
                console.log(err);
                toastr.error(err);
                return;
            }
            callback(response.data);
        });
    }

    function saveUssdFlow(data,callback){
        var payload = {};
        payload.action = "saveflow";
        payload.data = data;
        doPost(payload, function (err, response) {
            if (err) {
                console.log(err);
                toastr.error(err);
                return;
            }
            callback(response.data);
        });
    }







    function doPost(data, callback) {
        return $http.post(baseUrl,data)
            .then(function(response) {
                console.log(response);
                callback(null,response);
            })
            .catch(function (error) {
                console.log(error);
              callback(error);
        });
    }
}
})();