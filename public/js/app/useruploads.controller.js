(function () {
    'use strict';
    angular
    .module('ach.app')
    .controller('UserUploadsController', UserUploadsController);
    UserUploadsController.$inject = ['brudexservices'];

    function UserUploadsController(services) {
        var vm = this;
        vm.list = [];
        services.getUserUploads(function (array) {
            console.log("user uploads is >>");
            console.log(array);           
            vm.list = array;
        });

    }
})();
 