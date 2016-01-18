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
      return $http.get('https://peaceful-wildwood-5772.herokuapp.com/api/ruta');
    }
  }  
}) 
.factory('despachoService', ['$http', function($http){
	return{
		getDespachos:function(id){
      return $http.get('https://peaceful-wildwood-5772.herokuapp.com/api/usuario/'+id);
		},
		cambiarEstado:function(id, data){
			return $http.put('https://peaceful-wildwood-5772.herokuapp.com/api/despacho/'+id, data);
		},
    login:function(user){
        return $http.post('https://peaceful-wildwood-5772.herokuapp.com/api/usuario/'+user.username+'/'+user.password);
    }
	}
}]);
