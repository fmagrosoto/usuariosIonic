angular.module('app.controllers', [])
  
.controller('bienvenidoCtrl', function($scope, $state) {

    $scope.usuario = {};

    // Primero, saber si hay una sesión iniciada
    ionic.Platform.ready(function () {
        $scope.user = Ionic.User.current();
        if ($scope.user.isAuthenticated()) {
            
            $scope.usuario.nombre = $scope.user.details.name;
            $scope.usuario.id = $scope.user.id;
            $scope.usuario.fb = $scope.user.details.facebook_id;

            document.getElementById('bienvenido-list-item1').textContent = 'Nombre: ' + $scope.usuario.nombre;
            document.getElementById('bienvenido-list-item2').textContent = 'ID: ' + $scope.usuario.id;
            document.getElementById('bienvenido-list-item3').textContent = 'FB: ' + $scope.usuario.fb;

            var imagen = document.getElementById('fbpic');
            var elSource = "http://graph.facebook.com/" + $scope.usuario.fb + "/picture?type=large";
            imagen.setAttribute('src',elSource);

            if ($scope.usuario.nombre === null) {
                $state.go('completar');
            }

        } else {
            $state.go('firmar');
        }
    });

    $scope.cerrarSesion = function () {
        Ionic.Auth.logout();
        $state.go('firmar');
    }

})
   
.controller('firmarCtrl', function($scope, $state) {

    var success = function (user) {
        $state.go('bienvenido');
    };

    var failure = function (error) {
        console.log(error);
    };

    $scope.loginFB = function () {

        Ionic.Auth.login('facebook', {'remember': true}).then(success, failure);

    };

})
   
.controller('completarCtrl', function($scope, $state) {

    var user = Ionic.User.current();
    
    $scope.usuario = {};    

    $scope.grabarDatos = function () {
        
        user.details.name = $scope.usuario.nombre;
        user.details.email = $scope.usuario.correo;
        user.set('pais',$scope.usuario.pais);
        user.set('sexo',$scope.usuario.sexo);
        user.set('edad',$scope.usuario.edad);

        user.save().then(function () {
            $state.go('bienvenido');
        });

    }

})
 