angular
    .module('ach.app', [
        'ngAnimate',
        'ui.router'
    ]).config(function ($stateProvider, $urlRouterProvider) {
    //
    // For any unmatched url, redirect to /state1
    $urlRouterProvider.otherwise("/upload");
    //
    // Now set up the states    
    $stateProvider
        .state('createnew', {
            url: "/createnew",
            templateUrl: "/partials/createnew.html",
            controller: 'CreateNewUssdController',
            controllerAs: 'vm'
        }).state('managecodes', {
            url: "/managecodes",
            templateUrl: "/partials/managecodes.html",
            controller: 'ManageUssdCodesController',
            controllerAs: 'vm'
        })
        .state('manageflow', {
            url: "/manageflow/:id",
            templateUrl: "/partials/manageflow.html",
            controller: 'ManageUssdFlowController',
            controllerAs: 'vm'
        })
});