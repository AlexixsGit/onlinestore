var purchaseApp = angular.module('purchaseApp', ['categoriesAndSubApp', 'constantsApp']);

purchaseApp.run(function () {
    console.log('Ingresando al método principal de home...');
    $('#purchase').show();
    $('#purchaseErrorDiv').hide();
})

purchaseApp.controller('PurchaseController',
    ['$scope', '$http', '$window', 'categories', 'filterFilter',
        function ($scope, $http, $window, categories, filterFilter) {

            var purchaseCtrl = this;

            purchaseCtrl.view = {
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
                purchaseCtrl.portfolioItems = filterFilter(response.data.PortfolioItems,
                    JSON.parse(sessionStorage.getItem('itemSelectedToPurchase')).codeItem);
            });

            //Recupera la lista de modales asociados a los items del catalogo
            $http.get("../json/portfolioModalItems.json").then(function (response) {
                purchaseCtrl.portfolioModalItems = response.data.PortfolioModalItmes;
            });

            //Recupera la lista de prendas en diferentes perfiles
            $http.get("../json/portfolioItemsDetail.json").then(function (response) {
                purchaseCtrl.portfolioItemsDetail = response.data.PortfolioItemsDetail;
            });

            purchaseCtrl.email = {
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

            purchaseCtrl.sendMessage = function () {
                var req = {
                    method: 'POST',
                    url: location.origin + "/OnlineStore/rest/SendEmailRest/sendEmail",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    data: {
                        to: purchaseCtrl.email.to,
                        from: purchaseCtrl.email.from,
                        host: purchaseCtrl.email.host,
                        subject: purchaseCtrl.email.subject,
                        text: purchaseCtrl.email.text,
                        customerEmail: purchaseCtrl.email.customerEmail,
                        customerName: purchaseCtrl.email.customerName,
                        customerPhone: purchaseCtrl.email.customerPhone,
                        customerMessage: purchaseCtrl.email.customerMessage,
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


            purchaseCtrl.redirectTo = function () {
                $window.location.href = location.origin + '/OnlineStore/';
            }

            function cleanCustomerData() {
                purchaseCtrl.email.to = "";
                purchaseCtrl.email.from = "";
                purchaseCtrl.email.host = "";
                purchaseCtrl.email.subject = "";
                purchaseCtrl.email.text = "";
                purchaseCtrl.email.customerEmail = "";
                purchaseCtrl.email.customerName = "";
                purchaseCtrl.email.customerPhone = "";
                purchaseCtrl.email.customerMessage = "";
            }

        }]);
