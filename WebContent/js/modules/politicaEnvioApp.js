var politicaEnvioApp = angular.module('politicaEnvioApp', ['categoriesAndSubApp', 'constantsApp']);

politicaEnvioApp.run(function () {
    console.log('Ingresando al método principal de politicas de envio...');
    $('#politicaEnvio').show();
    $('#politicaEnvioDiv').hide();
})

politicaEnvioApp.controller('PoliticaEnvioController',
    ['$scope', '$http', '$window', 'categories', 'filterFilter',
        function ($scope, $http, $window, categories, filterFilter) {

            var politicaEnvioCtrl = this;

            politicaEnvioCtrl.view = {
                pageName: 'A tu estilo',
                title: 'Las mejores ofertas',
                divServiceTitle: 'Moda',
                divServicesSubTitle: 'Elige tu categoría',
                divLastCollectionTitle: 'Última colección',
                divLastCollectionSubTitle: 'Lo más nuevo',
                headerButtonLabel: 'Explorar',
            }

            politicaEnvioCtrl.redirectTo = function () {
                $window.location.href = location.origin + '/OnlineStore/';
            }
        }]);
