var menCollectionApp = angular.module('menCollectionApp', []);

menCollectionApp.run(function () {
    console.log('Ingresando al método principal de home...');
    $('#menCollection').show();
    $('#menCollectionErrorDiv').hide();
})

menCollectionApp.controller('MenCollectionController', ['$scope', '$http', '$window', function ($scope, $http, $window) {

    var menCollectionCtrl = this;

    menCollectionCtrl.view = {
        pageName: 'El madrugón del hueco',
        title: 'Las mejores ofertas',
        divServiceTitle: 'Moda',
        divServicesSubTitle: 'Elige tu categoría',
        divLastCollectionTitle: 'Última colección',
        divLastCollectionSubTitle: 'Lo más nuevo',
        headerButtonLabel: 'Explorar',
    }
    //Recupera la lista de items que se muestran en el catalogo
    $http.get("../json/portfolioItems.json").then(function (response) {
        menCollectionCtrl.portfolioItems = response.data.PortfolioItems;
    });

    //Recupera la lista de modales asociados a los items del catalogo
    $http.get("../json/portfolioModalItems.json").then(function (response) {
        menCollectionCtrl.portfolioModalItems = response.data.PortfolioModalItmes;
    });

    //Recupera la lista de categorias disponibles
    $http.get("../json/homeCategories.json").then(function (response) {
        menCollectionCtrl.homeCategories = response.data.HomeCategories;
    });

    menCollectionCtrl.email = {
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

    var localHost = "http://localhost:8080";
    var ipHost = "http://192.168.1.51:8080";
    var localUrl = localHost + "/OnlineStore/rest/SendEmailRest/sendEmail";
    var externalUrl = ipHost + "/OnlineStore/rest/SendEmailRest/sendEmail";

    menCollectionCtrl.sendMessage = function () {
        var req = {
            method: 'POST',
            url: localUrl,
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
                ip: sessionStorage.getItem('ipAddress')
            }
        }

        $http(req).then(function successCallback(response) {
            cleanCustomerData();

        }, function errorCallback(response) {
            // called asynchronously if an error occurs
            // or server returns response with an error status.
        });
    }


    menCollectionCtrl.redirectTo = function () {
        $window.location.href = location.origin + '/OnlineStore/';
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
