var homeApp = angular.module('homeApp', []);

homeApp.controller('HomeController', ['$scope', function ($scope) {

    var homeCtrl = this;

    homeCtrl.view = {
        pageName: 'El madrugón del hueco',
        title: 'Encuentra las mejores ofertas',
        divServiceTitle: 'Servicios',
        divLastCollectionTitle: 'Última colección'
    }

}]);