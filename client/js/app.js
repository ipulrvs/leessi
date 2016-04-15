/**
* app Module
*
* Description
*/
angular
  .module('app', [
    'ui.router',
    'lbServices',
    'ls.LiveSet',
    'ls.ChangeStream'
    ])
  .config(function($stateProvider, $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '',
        templateUrl: 'main/main.html',
        controller: 'MainController'
      })
  })
  .run(['$rootScope', '$state', function($rootScope, $state){
    
  }]);
