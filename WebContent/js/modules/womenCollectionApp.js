var womenCollectionApp = angular.module('womenCollectionApp', ['categoriesAndSubApp', 'constantsApp', 'directives']);

womenCollectionApp.run(function () {
    console.log('Ingresando al método principal de women collection...');
    $('#womenCollection').show();
    $('#womenCollectionErrorDiv').hide();
})

womenCollectionApp.controller('WomenCollectionController',
    ['$scope', '$http', '$window', 'categories', 'filterFilter',
        function ($scope, $http, $window, categories, filterFilter) {

            var womenCollectionCtrl = this;

            $scope.filteredData = []
                , $scope.currentPage = 1
                , $scope.numPerPage = 15
                , $scope.maxSize = 5;


            womenCollectionCtrl.view = {
                pageName: 'Ropa para mujer',
                title: 'Al mejor precio',
                divServiceTitle: 'Moda',
                divServicesSubTitle: 'Elige tu categoría',
                divLastCollectionTitle: 'Ropa para mujer',
                divLastCollectionSubTitle: 'Lo más nuevo',
                headerButtonLabel: 'Explorar',
            }


            $scope.boundaryLinks = false;
            $scope.$watch('currentPage + numPerPage', function () {
                $http.get("../json/portfolioItems.json").then(function (response) {
                    womenCollectionCtrl.portfolioItems = filterFilter(response.data.PortfolioItems, categories.Women);
                    $scope.boundaryLinks = true;
                    paginate();
                });
            });


            //Recupera la lista de categorias disponibles
            $http.get("../json/homeCategories.json").then(function (response) {
                womenCollectionCtrl.homeCategories = response.data.HomeCategories;
            });

            //Ir a comprar
            womenCollectionCtrl.goToPurchase = function (itemSelected) {
                sessionStorage.setItem('itemSelectedToPurchase', JSON.stringify(itemSelected));
                $window.location.href = location.origin + '/OnlineStore/html/purchase.html';
            }

            //Regresar al inicio
            womenCollectionCtrl.returnToHome = function () {
                $window.location.href = location.origin + '/OnlineStore/';
            }

            function paginate() {
                begin = (($scope.currentPage - 1) * $scope.numPerPage);
                end = begin + $scope.numPerPage;
                if (womenCollectionCtrl.portfolioItems !== undefined) {
                    $scope.filteredData =
                        womenCollectionCtrl.portfolioItems.slice(begin, end);
                }
            }

        }]);
