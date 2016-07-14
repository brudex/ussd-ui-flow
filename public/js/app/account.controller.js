(function () {
    'use strict';
    angular
    .module('ach.app')
    .controller('AccountControler', AccountControler);
    AccountControler.$inject = ['brudexservices'];
    function AccountControler(services) {
        var vm = this;
        vm.accountModel = {};
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
            if (vm.accountModel.confirmAccessCode != null) {
                if (vm.accountModel.confirmAccessCode === vm.accountModel.accessCode) {
                    services.createAccount(function(response) {
                        console.clear();
                        console.log(response);
                        vm.submitMessage = response.message;
                        vm.messageClass = "alert-success";
                    });
                } else {
                    vm.submitMessage = "Access code confirmation does not match";
                    vm.messageClass = "alert-danger";
                }
            }          
        };

       
    }
})();
 