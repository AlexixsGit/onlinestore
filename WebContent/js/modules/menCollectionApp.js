var menCollectionApp = angular.module('menCollectionApp', ['categoriesAndSubApp', 'constantsApp']);

menCollectionApp.run(function () {
    console.log('Ingresando al método principal de men collection...');
    $('#menCollection').show();
    $('#menCollectionErrorDiv').hide();
})

menCollectionApp.controller('MenCollectionController',
    ['$scope', '$http', '$window', 'categories', 'filterFilter',
        function ($scope, $http, $window, categories, filterFilter) {

            var menCollectionCtrl = this;

            menCollectionCtrl.view = {
                pageName: 'El madrugón del hueco',
                title: 'Las mejores ofertas',
                divServiceTitle: 'Moda',
                divServicesSubTitle: 'Elige tu categoría',
                divLastCollectionTitle: 'Ropa para hombre',
                divLastCollectionSubTitle: 'Lo más nuevo',
                headerButtonLabel: 'Explorar',
            }
            //Recupera la lista de items que se muestran en el catalogo
            $http.get("../json/portfolioItems.json").then(function (response) {
                menCollectionCtrl.portfolioItems = filterFilter(response.data.PortfolioItems, categories.Men);
            });

            //Recupera la lista de modales asociados a los items del catalogo
            $http.get("../json/portfolioModalItems.json").then(function (response) {
                menCollectionCtrl.portfolioModalItems = response.data.PortfolioModalItmes;
            });

            //Recupera la lista de categorias disponibles
            $http.get("../json/homeCategories.json").then(function (response) {
                menCollectionCtrl.homeCategories = response.data.HomeCategories;
            });

            //Ir a comprar
            menCollectionCtrl.goToPurchase = function (itemSelected) {
                sessionStorage.setItem('itemSelectedToPurchase', JSON.stringify(itemSelected));
                $window.location.href = location.origin + '/OnlineStore/html/purchase.html';
            }

            //Regresar al inicio
            menCollectionCtrl.returnToHome = function () {
                $window.location.href = location.origin + '/OnlineStore/index.html';
            }

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

            menCollectionCtrl.sendMessage = function () {
                var req = {
                    method: 'POST',
                    url: location.origin + "/OnlineStore/rest/SendEmailRest/sendEmail",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    data: {
                        to: menCollectionCtrl.email.to,
                        from: menCollectionCtrl.email.from,
                        host: menCollectionCtrl.email.host,
                        subject: menCollectionCtrl.email.subject,
                        text: menCollectionCtrl.email.text,
                        customerEmail: menCollectionCtrl.email.customerEmail,
                        customerName: menCollectionCtrl.email.customerName,
                        customerPhone: menCollectionCtrl.email.customerPhone,
                        customerMessage: menCollectionCtrl.email.customerMessage,
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
                menCollectionCtrl.email.to = "";
                menCollectionCtrl.email.from = "";
                menCollectionCtrl.email.host = "";
                menCollectionCtrl.email.subject = "";
                menCollectionCtrl.email.text = "";
                menCollectionCtrl.email.customerEmail = "";
                menCollectionCtrl.email.customerName = "";
                menCollectionCtrl.email.customerPhone = "";
                menCollectionCtrl.email.customerMessage = "";
            }

        }]);
