var homeApp = angular.module('homeApp', []);

homeApp.controller('HomeController', ['$scope', '$http', function ($scope, $http) {

    var homeCtrl = this;

    homeCtrl.view = {
        pageName: 'El madrugón del hueco',
        title: 'Encuentra las mejores ofertas',
        divServiceTitle: 'Servicios',
        divLastCollectionTitle: 'Última colección'
    }

    $http.get("json/portfolioItems.json").then(function (response) {
        homeCtrl.menus = response.data.DivCatalogs;
    });

}]);