var homeApp = angular.module('homeApp', []);

homeApp.controller('HomeController', ['$scope', function ($scope) {

    var homeCtrl = this;

    homeCtrl.pageName = 'El madrugón del hueco';
    homeCtrl.title = 'Encuentra las mejores ofertas';
}]);