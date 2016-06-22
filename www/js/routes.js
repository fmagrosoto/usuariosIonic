angular.module('app.routes', [])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

      .state('bienvenido', {
    url: '/bienvenido',
    templateUrl: 'templates/bienvenido.html',
    controller: 'bienvenidoCtrl'
  })

  .state('firmar', {
    url: '/firmar',
    templateUrl: 'templates/firmar.html',
    controller: 'firmarCtrl'
  })

  .state('completar', {
    url: '/completar',
    templateUrl: 'templates/completar.html',
    controller: 'completarCtrl'
  })

$urlRouterProvider.otherwise('/bienvenido')

  

});