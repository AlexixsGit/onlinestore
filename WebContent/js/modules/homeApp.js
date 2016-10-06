var homeApp = angular.module('homeApp', ["ngRoute"]);

homeApp.config(function ($routeProvider) {
    $routeProvider.when('/MenCollection', {
        templateUrl: 'html/menCollection.html'
    }).when('/', {
        templateUrl: 'html/home.html'
    }).otherwise({
        redirectTo: '/'
    })
})

homeApp.controller('HomeController', ['$scope', '$http', '$location', function ($scope, $http, $location) {

    var homeCtrl = this;

    homeCtrl.view = {
        pageName: 'El madrugón del hueco',
        title: 'Las mejores ofertas',
        divServiceTitle: 'Moda',
        divServicesSubTitle: 'Escoge la moda a tu gusto',
        divLastCollectionTitle: 'Última colección',
        divLastCollectionSubTitle: 'Lo más nuevo',
        headerButtonLabel: 'Explorar',
    }

    //Recupera la lista de items que se muestran en el catalogo
    $http.get("json/portfolioItems.json").then(function (response) {
        homeCtrl.portfolioItems = response.data.PortfolioItems;
    });

    //Recupera la lista de modales asociados a los items del catalogo
    $http.get("json/portfolioModalItems.json").then(function (response) {
        homeCtrl.portfolioModalItems = response.data.PortfolioModalItmes;
    });

    homeCtrl.redirectTo = function () {
        $location.path("/MenCollection");
    }

}]);