angular.module('app.controllers', [])
  
.controller('bienvenidoCtrl', function($scope, $state) {

    $scope.usuario = {};

    // Primero, saber si hay una sesión iniciada
    ionic.Platform.ready(function () {
        $scope.user = Ionic.User.current();
        if ($scope.user.isAuthenticated()) {
            
            $scope.usuario.nombre = $scope.user.details.name;
            $scope.usuario.correo = $scope.user.get('correo');
            $scope.usuario.id = $scope.user.id;
            $scope.usuario.fb = $scope.user.details.facebook_id;
            $scope.usuario.tw = $scope.user.details.twitter_id;

            var social = ($scope.usuario.fb !== undefined) ? 'FB: ' + $scope.usuario.fb : 'TW: ' + $scope.usuario.tw;

            document.getElementById('usrNombre').textContent = 'Nombre: ' + $scope.usuario.nombre;
            document.getElementById('usrID').textContent = 'ID: ' + $scope.usuario.id;
            document.getElementById('usrSOC').textContent = social;
            document.getElementById('usrMail').textContent = 'Correo: ' + $scope.usuario.correo;

            var imagen = document.getElementById('fbpic');
            var elSource = "http://graph.facebook.com/" + 
            $scope.usuario.fb + 
            "/picture?type=large";

            if($scope.usuario.fb === undefined) {
                elSource = $scope.user.details.image;
            }

            imagen.style.backgroundImage = "url('" + elSource + "')";

            if ($scope.usuario.nombre === null || $scope.usuario.nombre === undefined) {
                // Si sí hay una sesión iniciada pero NO tiene nombre, entonces...
                $state.go('completar');
            }

        } else {
            // Si no hay una sesión iniciada, entonces...
            $state.go('firmar');
        }
    });

    // Cerrar sesión de usuario
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

    // Iniciar sesión con Facebook
    $scope.loginFB = function () {
        Ionic.Auth.login('facebook', {'remember': true}).then(success, failure);
    };

    // Iniciar sesión con Facebook
    $scope.loginTW = function () {
        Ionic.Auth.login('twitter', {'remember': true}).then(success, failure);
    };

})
   
.controller('completarCtrl', function($scope, $state, $ionicPopup) {

    var user = Ionic.User.current();

    $scope.usuario = {};
    $scope.grabarDatos = function () {

        user.details.name = $scope.usuario.nombre;
        user.set('pais',$scope.usuario.pais);
        user.set('sexo',$scope.usuario.sexo);
        user.set('edad',$scope.usuario.edad);
        user.set('correo',$scope.usuario.correo);

        // Validar campos
        if($scope.usuario.nombre === undefined || $scope.usuario.nombre.length < 5) {
            var popup = $ionicPopup.alert({
                title: 'Campo NOMBRE',
                template: 'Es necesario agregar el NOMBRE completo'
            });
            return;
        }

        if($scope.usuario.correo === undefined) {
            var popup = $ionicPopup.alert({
                title: 'Campo CORREO',
                template: 'Es necesario agregar el CORREO completo'
            });
            return;
        } else {
            var expr = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
            if (!expr.test($scope.usuario.correo)) {
                var popup = $ionicPopup.alert({
                    title: 'Corregir CORREO',
                    template: 'El correo es inválido'
                });
                return;
            }
        }

        if($scope.usuario.pais === undefined || $scope.usuario.pais.length < 5) {
            var popup = $ionicPopup.alert({
                title: 'Campo PAÍS',
                template: 'Es necesario agregar el PAÍS completo'
            });
            return;
        }

        if($scope.usuario.sexo === undefined || $scope.usuario.sexo.length < 5) {
            var popup = $ionicPopup.alert({
                title: 'Campo SEXO',
                template: 'Es necesario agregar el SEXO completo'
            });
            return;
        }

        if($scope.usuario.edad === undefined) {
            var popup = $ionicPopup.alert({
                title: 'Campo EDAD',
                template: 'Es necesario agregar la EDAD'
            });
            return;
        }

        // Finalmente grabar datos
        user.save().then(function () {
            $state.go('bienvenido');
        });
    }
})
 