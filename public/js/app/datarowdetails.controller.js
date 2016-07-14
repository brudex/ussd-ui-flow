(function () {
    'use strict';
    angular
    .module('ach.app')
    .controller('DataRowDetailsController', DataRowDetailsController);
    DataRowDetailsController.$inject = ['brudexservices','$stateParams'];
    //here a single row in the excel file is viewed
    function DataRowDetailsController(services,stateParams) {
        var vm = this;
        vm.details = {};
        var id = stateParams.id;
        console.clear();
        console.log("stateparams");
        console.log(stateParams);
        services.getRowDetails(id, function (result) {
            console.log("Row Details");
            console.log(result);
            vm.details = result;
        });
        vm.approveSelected = function () {
            var selectedList = [vm.details.id];
            services.approveUploads(selectedList, function (result) {
                toastr.info(result.message);
                initData();
            });
        };
    }
})();
 