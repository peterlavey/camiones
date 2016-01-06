angular.module('starter.service', [])
.service('LoginService', function($q) {
    return {
        loginUser: function(name, pw) {
            var deferred = $q.defer();
            var promise = deferred.promise;
 
            if (name == 'admin' && pw == 'admin') {
                deferred.resolve('Welcome ' + name + '!');
            } else {
                deferred.reject('Wrong credentials.');
            }
            promise.success = function(fn) {
                promise.then(fn);
                return promise;
            }
            promise.error = function(fn) {
                promise.then(null, fn);
                return promise;
            }
            return promise;
        }
    }
})
.factory('despachoService', ['$http', function($http){
	return{
		getDespachos:function(){
			return $http.get('http://localhost:3000/api/despacho');
		},
		cambiarEstado:function(id, data){
			return $http.put('http://localhost:3000/api/despacho/'+id, data);
		}
	}
}]);
