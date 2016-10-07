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

    homeCtrl.email = {
        to: "",
        from: "",
        host: "",
        subject: "",
        text: "",
        customerEmail: "",
        customerName: "",
        customerPhone: "",
        customerMessage: ""
    }

    var localUrl = "http://localhost:8080/OnlineStore/rest/SendEmailRest/sendEmail";
    var externalUrl = "http://192.168.1.51:8080/OnlineStore/rest/SendEmailRest/sendEmail";

    homeCtrl.sendMessage = function () {
        var req = {
            method: 'POST',
            url: externalUrl,
            headers: {
                'Content-Type': "application/json"
            },
            data: {
                to: homeCtrl.email.to,
                from: homeCtrl.email.from,
                host: homeCtrl.email.host,
                subject: homeCtrl.email.subject,
                text: homeCtrl.email.text,
                customerEmail: homeCtrl.email.customerEmail,
                customerName: homeCtrl.email.customerName,
                customerPhone: homeCtrl.email.customerPhone,
                customerMessage: homeCtrl.email.customerMessage,
            }
        }

        $http(req).then(function successCallback(response) {
            cleanCustomerData();

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }


    homeCtrl.redirectTo = function () {
        $location.path("/MenCollection");
    }

    function cleanCustomerData() {
        homeCtrl.email.to = "";
        homeCtrl.email.from = "";
        homeCtrl.email.host = "";
        homeCtrl.email.subject = "";
        homeCtrl.email.text = "";
        homeCtrl.email.customerEmail = "";
        homeCtrl.email.customerName = "";
        homeCtrl.email.customerPhone = "";
        homeCtrl.email.customerMessage = "";
    }

}]);