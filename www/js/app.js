angular.module('starter', ['ionic', 'starter.controller', 'starter.service', 'starter.constant'])

.run(function($ionicPlatform, $http) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
  var defaultHTTPHeaders={
    'Content-Type':'application/json',
    'Accept':'application/json'
  };

  $http.defaults.headers.post=defaultHTTPHeaders;
})
.config(function($stateProvider, $urlRouterProvider){
  $stateProvider
  .state('login', {
      url: '/login',
      templateUrl: 'templates/login.html',
      controller: 'LoginCtrl'
  })
  .state('app', {
    url:'/app',
    abstract:true,
    templateUrl:'templates/main.html',
    controller: 'despachoController'
  })
  .state('app.market', {          
    url: '/market',
    views: {
      'content': {
        templateUrl: 'templates/market.html',
        controller: 'MarketCtrl'
      }
    }
  })
  .state('app.list', {          
    url: '/list',
    views: {
      'content': {
        templateUrl: 'templates/list.html'
      }
    }
  })
  .state('app.single', {          
    url: '/single',
    views: {
      'content': {
        templateUrl: 'templates/single.html'
      }
    }
  })
  $urlRouterProvider.otherwise('/login');
})
.directive( 'elemReady', function( $parse ) {
   return {
       restrict: 'A',
       link: function( $scope, elem, attrs ) {    
          elem.ready(function(){
            $scope.$apply(function(){
                var func = $parse(attrs.elemReady);
                func($scope);
            })
          })
       }
    }
});
