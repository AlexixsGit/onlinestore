var homeApp = angular.module('homeApp', ['categoriesAndSubApp', 'constantsApp']);

homeApp.run(function () {
    console.log('Ingresando al método principal de home...');
    $('#mainDiv').show();
    $('#genericErrorDiv').hide();
})


homeApp.controller('HomeController',
    ['$scope', '$http', '$location', '$window', 'categories', 'filterFilter', 'enabled_disabled', 'itemCollection',
        function ($scope, $http, $location, $window, categories, filterFilter, enabled_disabled, itemCollection) {

            var homeCtrl = this;


            homeCtrl.view = {
                pageName: 'El madrugón del hueco',
                title: 'Las mejores ofertas',
                adds2Title: 'Nuevas colecciones',
                adds2SubTitle: 'Mira lo más nuevo',
                adds2ButtonLabel: 'Colección nueva',
                adds3Title: 'Pago fácil y seguro',
                adds3SubTitle: 'Lo Recibes y pagas',
                adds3ButtonLabel: 'Ver como pagar',
                divServiceTitle: 'Moda',
                divServicesSubTitle: 'Elige tu categoría',
                divLastCollectionTitle: 'Última colección',
                divLastCollectionSubTitle: 'Lo más nuevo',
                headerButtonLabel: 'Explorar',
            }

            //Recupera la lista de items que se muestran en el catalogo
            $http.get("json/portfolioItems.json").then(function (response) {
                homeCtrl.portfolioItems = filterFilter(response.data.PortfolioItems, itemCollection.New);
            });

            //Recupera la lista de categorias disponibles
            $http.get("json/homeCategories.json").then(function (response) {
                homeCtrl.homeCategories = filterFilter(response.data.HomeCategories, enabled_disabled.Enabled);
            });

            //Ir a comprar
            homeCtrl.goToPurchase = function (itemSelected) {
                sessionStorage.setItem('itemSelectedToPurchase', JSON.stringify(itemSelected));
                $window.location.href = location.origin + '/OnlineStore/html/purchase.html';
            }

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

            homeCtrl.sendMessage = function () {
                var req = {
                    method: 'POST',
                    url: location.origin + "/OnlineStore/rest/SendEmailRest/sendEmail",
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


            homeCtrl.redirectTo = function () {
                $window.location.href = location.origin + '/OnlineStore/html/menCollection.html';
            }

            //Ejecucion inicial de la aplicacion
            init();
            function init() {
                $http.get(location.origin + "/OnlineStore/rest/InitApp/writeLog").then(function (response) {
                    sessionStorage.setItem("ipAddress", response.data.ip.hostAddress);
                });

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
