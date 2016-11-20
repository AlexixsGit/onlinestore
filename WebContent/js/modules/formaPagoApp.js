var formaPagoApp = angular.module('formaPagoApp', ['categoriesAndSubApp', 'constantsApp']);

formaPagoApp.run(function () {
    console.log('Ingresando al método principal de formas de pago...');
    $('#formaPago').show();
    $('#formaPagoDiv').hide();
})

formaPagoApp.controller('FormaPagoController',
    ['$scope', '$http', '$window', 'categories', 'filterFilter',
        function ($scope, $http, $window, categories, filterFilter) {

            var formaPagoCtrl = this;

            formaPagoCtrl.view = {
                pageName: 'A tu estilo',
                title: 'Las mejores ofertas',
                divServiceTitle: 'Moda',
                divServicesSubTitle: 'Elige tu categoría',
                divLastCollectionTitle: 'Última colección',
                divLastCollectionSubTitle: 'Lo más nuevo',
                headerButtonLabel: 'Explorar',
            }

            formaPagoCtrl.redirectTo = function () {
                $window.location.href = location.origin + '/OnlineStore/';
            }
        }]);
