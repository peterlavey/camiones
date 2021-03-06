angular.module('starter.controller', [])

.controller('LoginCtrl', function ($scope, $http, $window, despachoService, $state) {
 	$scope.user =  {username: 'admin', password: '123'};
  	$scope.message = '';
  	$scope.submit = function () {
  		despachoService.login($scope.user).success(function (data, status, headers, config) {
			$window.sessionStorage.token = data.token;
			$window.sessionStorage.usuario = data.usuario._id;
			$window.sessionStorage.mensaje = "Hola ".concat(data.usuario.nombre? data.usuario.nombre : data.usuario.username);
	        $scope.message = 'Welcome';
	        $state.go('app.list');
	    }).error(function (data, status, headers, config) {
	        delete $window.sessionStorage.token;
	        $scope.message = 'Error: Invalid user or password';
	    });
	};
})
.controller('MarketCtrl', function ($scope, MarketService) {
	$scope.getRutas=function(){
		MarketService.getRutas().success(function(data){
			$scope.rutas=data;
		});
	}	

	$scope.getRutas();	
})	
.controller('despachoController', ['$scope', '$rootScope', 'despachoService', '$filter', '$window',
	function($scope, $rootScope, despachoService, $filter, $window){
	$scope.bienvenida=$window.sessionStorage.mensaje;
	$scope.getDespachos=function(){
		despachoService.getDespachos($window.sessionStorage.usuario).success(function(data){
			$scope.despachos=data;

			angular.forEach($scope.despachos, function(value, key){

			});
		});	
	};

	$scope.seleccionaDespacho=function(despacho){
		$scope.despacho=$filter('filter')($scope.despachos, function(data){
			return data._id == despacho._id
		})[0];

		//$scope.despacho.nombreEstado=$scope.nombreEstado($scope.despacho);
	};

	$scope.getDespachos();

	$scope.setMap=function(){
		$scope.createMap();	
	};

	$scope.cambiarEstado=function(){
		if($scope.despacho.estado<5){
			$scope.despacho.estado=$scope.despacho.estado+1;
		}
		despachoService.cambiarEstado($scope.despacho._id, $scope.despacho).success(function(data){
			console.log("success!");
			$scope.despacho.nombreEstado=$scope.nombreEstado($scope.despacho);
		});
	};

	$scope.nombreEstado=function(despacho){
		switch(despacho.estado){
			case 1:
				return "En camino";
			break;
			case 2:
				return "Esperando...";
			break;
			case 3:
				return "Despachando";
			break;
			case 4:
				return "Terminado!";
			break;
			default:
				return "Terminado!";
			break;
		}
	}

	$scope.createMap=function(){
		var coords= new google.maps.LatLng($scope.despacho.direccion.lat, $scope.despacho.direccion.lon);
		var config= {
			center: coords,
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById("map"), config);

		map.setCenter(new google.maps.LatLng($scope.despacho.direccion.lat, $scope.despacho.direccion.lon));
	    var myLocation = new google.maps.Marker({
	        position: new google.maps.LatLng($scope.despacho.direccion.lat, $scope.despacho.direccion.lon),
	        map: map,
	        title: "My Location"
	    });	

		$scope.map=map;
    };

    $scope.getGeolocalization=function(){
    	var coords= new google.maps.LatLng($scope.despacho.direccion.lat,$scope.despacho.direccion.lon);
		var config= {
			center: coords,
			zoom: 16,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};

		var map = new google.maps.Map(document.getElementById("map"), config);

		
		/*add $ionicLoading in the function*/
		navigator.geolocation.getCurrentPosition(function(pos) {
	        map.setCenter(new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude));
	        var myLocation = new google.maps.Marker({
	            position: new google.maps.LatLng(pos.coords.latitude, pos.coords.longitude),
	            map: map,
	            title: "My Location"
	        });

	    });
		

		$scope.map=map;
    };


}]);