(function () {
    'use strict';
    angular
    .module('ach.app')
    .controller('ManageUssdCodesController', ManageUssdCodesController);
    ManageUssdCodesController.$inject = ['brudexservices'];
    function ManageUssdCodesController(services) {
        var vm = this;
        vm.ussdapps = [];
        vm.deleteApp = function(appId){
            console.log("AppId is >>>>> "+appId);
            services.deleteUssdApp(appId,function (response) {
                console.log("Response is >>>");
                console.log(response);
                if(response.status=='00'){
                    getUssdApps();
                    toastr.warning(response.message);
                }else{
                    toastr.success(response.message)
                }
                console.log("Response is >>>");
            });
        };

       function getUssdApps(){
            services.getUssdApps(function (response) {
                if(response.status=='00'){
                    vm.ussdapps = response.data;
                }
                console.log("Array is >>>");
                console.log(response);
            });
        }
        getUssdApps();
    }
})();
 