var homeApp = angular.module('homeApp', []);

homeApp.controller('HomeController', ['$scope', '$http', function ($scope, $http) {

    var homeCtrl = this;

    homeCtrl.view = {
        pageName: 'El madrugón del hueco',
        title: 'Encuentra las mejores ofertas',
        divServiceTitle: 'Servicios',
        divLastCollectionTitle: 'Última colección',
        divLastCollectionSubTitle: 'Lo más nuevo'
    }

    //Recupera la lista de imagenes que se muestran en el catalogo
    $http.get("json/portfolioItems.json").then(function (response) {
        homeCtrl.portfolioItems = response.data.PortfolioItems;
    });

}]);