(function () {
    'use strict';

    angular
    .module('ach.app')
    .controller('CreateNewUssdController', CreateNewUssdController);
    CreateNewUssdController.$inject = ['brudexservices'];

    function CreateNewUssdController(services) {
        var vm = this;
        vm.ussdApp = {};
        vm.formSubmitted = false;
        vm.submitMessage = "";
        vm.messageClass = "alert-success";

        vm.createAccount = function (valid) {
            vm.formSubmitted = true;
            if (!valid) {
                vm.submitMessage = "Some fields are required";
                vm.messageClass = "alert-danger";
                return;
            }
            services.createUssd(vm.ussdApp,function(response) {
                console.clear();
                console.log(response);
                vm.submitMessage = response.message;
                vm.messageClass = "alert-success";
            });

        };


    }
})();
 