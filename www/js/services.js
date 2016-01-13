angular.module('starter.service', [])
.factory('authInterceptor', function ($rootScope, $q, $window) {
  return {
    request: function (config) {
      config.headers = config.headers || {};
      if ($window.sessionStorage.token) {
        config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
      }
      return config;
    },
    response: function (response) {
      if (response.status === 401) {
        // handle the case where the user is not authenticated
      }
      return response || $q.when(response);
    }
  };
})
.config(function ($httpProvider) {
  $httpProvider.interceptors.push('authInterceptor');
})
.factory('MarketService', function ($http) {
  return{
    getRutas:function(){
      return $http.get('http://localhost:3000/api/ruta');
    }
  }  
}) 
.factory('despachoService', ['$http', function($http){
	return{
		getDespachos:function(id){
      return $http.get('http://localhost:3000/api/usuario/'+id);
		},
		cambiarEstado:function(id, data){
			return $http.put('http://localhost:3000/api/despacho/'+id, data);
		},
    login:function(user){
        return $http.post('http://localhost:3000/api/usuario/'+user.username+'/'+user.password);
    }
	}
}]);
