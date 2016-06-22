angular.module('app.services', [])

.factory('BlankFactory', [function(){

}])

.service('BlankService', [function(){

}])

.service('usuario', [function(){
    this.usrNombre = null;
    this.usrID = null;
    this.usrFB = null;
    this.esUsuario = false;
}]);

