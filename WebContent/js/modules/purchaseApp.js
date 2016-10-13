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

            //Objeto que contiene la informacion ingresada por el cliente
            purchaseCtrl.customerInfo = {
                name: '',
                email: '',
                phone: '',
                address: '',
                message: ''
            }


            //Variable que almacena el valor seleccionado en las tallas
            purchaseCtrl.itemSizeSelected = '';
            //Variable que indica si una talla fue seleccionada
            purchaseCtrl.isItemSizeSelected = false;
            //Variable que indica si cumplio las validaciones para mostrar el popup de compras
            purchaseCtrl.isValidToShowPurchasePopup = true;
            //Registro seleccionado para ser comprado
            purchaseCtrl.itemToPurchase = {};
            //Indica si la compra fue exitosa
            purchaseCtrl.purchaseDone = false;
            //Indica que la compra esta en proceso
            purchaseCtrl.purchaseInProgress = false;
            purchaseCtrl.purchaseNotFinish = false;
            //Recupera la lista de items que se muestran en el catalogo
            $http.get("../json/portfolioItems.json").then(function (response) {
                purchaseCtrl.portfolioItems = filterFilter(response.data.PortfolioItems,
                    JSON.parse(sessionStorage.getItem('itemSelectedToPurchase')).code);
            });

            //Recupera la lista de modales asociados a los items del catalogo
            $http.get("../json/portfolioModalItems.json").then(function (response) {
                purchaseCtrl.portfolioModalItems = response.data.PortfolioModalItmes;
            });

            //Recupera la lista de prendas en diferentes perfiles
            $http.get("../json/portfolioItemsDetail.json").then(function (response) {
                purchaseCtrl.portfolioItemsDetail =
                    filterFilter(response.data.PortfolioItemsDetail, 'det_' + JSON.parse(sessionStorage.getItem('itemSelectedToPurchase')).code);
            });

            //Validacion de datos obligatorios para mostrar el popup de compras
            purchaseCtrl.showPurchasePopup = function (itemToPurchase) {
                purchaseCtrl.isValidToShowPurchasePopup = true;
                if (itemToPurchase.sizes.length > 0 && purchaseCtrl.itemSizeSelected === '') {
                    purchaseCtrl.isItemSizeSelected = false;
                    purchaseCtrl.isValidToShowPurchasePopup = false;
                }
            }
            //Regresar al inicio
            purchaseCtrl.returnToHome = function () {
                $window.location.href = location.origin + '/OnlineStore/index.html';
            }
            purchaseCtrl.itemSizeChanged = function () {
                purchaseCtrl.isItemSizeSelected = true;
                purchaseCtrl.isValidToShowPurchasePopup = true;
            }

            //Metodo para realizar la compra
            $scope.purchase = function () {
                purchaseCtrl.purchase = {
                    product: purchaseCtrl.portfolioItems[0],
                    customerInfo: purchaseCtrl.customerInfo
                }
                if (validate()) {
                    purchaseCtrl.purchaseInProgress = true;
                    purchaseCtrl.sendMessage();
                }
            }

            //Enviar mensaje
            purchaseCtrl.sendMessage = function () {
                var req = {
                    method: 'POST',
                    url: location.origin + "/OnlineStore/rest/SendEmailRest/sendEmail",
                    headers: {
                        'Content-Type': "application/json"
                    },
                    data: {
                        customerEmail: purchaseCtrl.purchase.customerInfo.email,
                        customerName: purchaseCtrl.purchase.customerInfo.name,
                        customerPhone: purchaseCtrl.purchase.customerInfo.phone,
                        customerMessage: purchaseCtrl.purchase.customerInfo.message,
                        customerAddress: purchaseCtrl.purchase.customerInfo.address,
                        ip: sessionStorage.getItem('ipAddress'),
                        productName: purchaseCtrl.purchase.product.name,
                        productReference: purchaseCtrl.purchase.product.reference,
                        productCode: purchaseCtrl.purchase.product.code,
                        productPrice: purchaseCtrl.purchase.product.price,
                        productSize: purchaseCtrl.itemSizeSelected !== '' ? purchaseCtrl.itemSizeSelected : 'Talla unica',
                    }
                }

                $http(req).then(function successCallback(response) {
                    purchaseCtrl.purchaseDone = true;
                    purchaseCtrl.purchaseInProgress = false;
                }, function errorCallback(response) {
                    purchaseCtrl.purchaseInProgress = false;
                    purchaseCtrl.purchaseNotFinish = true;
                    console.log(response);
                });
            }


            purchaseCtrl.redirectTo = function () {
                $window.location.href = location.origin + '/OnlineStore/';
            }


            //Metodo que valida los campos obligatorios
            function validate() {
                if (purchaseCtrl.purchase.customerInfo.email === '')
                    return false;
                if (purchaseCtrl.purchase.customerInfo.name === '')
                    return false;
                if (purchaseCtrl.purchase.customerInfo.phone === '')
                    return false;
                if (purchaseCtrl.purchase.customerInfo.address === '')
                    return false;
                return true;
            }

        }]);
