var menCollectionApp = angular.module('menCollectionApp', ['categoriesAndSubApp', 'constantsApp', 'directives']);

menCollectionApp.run(function () {
    console.log('Ingresando al método principal de men collection...');
    $('#menCollection').show();
    $('#menCollectionErrorDiv').hide();
})

menCollectionApp.controller('MenCollectionController',
    ['$scope', '$http', '$window', 'categories', 'filterFilter',
        function ($scope, $http, $window, categories, filterFilter) {

            var menCollectionCtrl = this;

            $scope.filteredData = []
                , $scope.currentPage = 1
                , $scope.numPerPage = 15
                , $scope.maxSize = 5;


            menCollectionCtrl.view = {
                pageName: 'Ropa para hombre',
                title: 'Al mejor precio',
                divServiceTitle: 'Moda',
                divServicesSubTitle: 'Elige tu categoría',
                divLastCollectionTitle: 'Ropa para hombre',
                divLastCollectionSubTitle: 'Lo más nuevo',
                headerButtonLabel: 'Explorar',
            }


            $scope.boundaryLinks = false;
            $scope.$watch('currentPage + numPerPage', function () {
                $http.get("../json/portfolioItems.json").then(function (response) {
                    menCollectionCtrl.portfolioItems = filterFilter(response.data.PortfolioItems, categories.Men);
                    $scope.boundaryLinks = true;
                    paginate();
                });
            });

            //Ir a comprar
            menCollectionCtrl.goToPurchase = function (itemSelected) {
                sessionStorage.setItem('itemSelectedToPurchase', JSON.stringify(itemSelected));
                $window.location.href = location.origin + '/OnlineStore/html/purchase.html';
            }

            //Regresar al inicio
            menCollectionCtrl.returnToHome = function () {
                $window.location.href = location.origin + '/OnlineStore/';
            }

            function paginate() {
                begin = (($scope.currentPage - 1) * $scope.numPerPage);
                end = begin + $scope.numPerPage;
                if (menCollectionCtrl.portfolioItems !== undefined) {
                    $scope.filteredData =
                        menCollectionCtrl.portfolioItems.slice(begin, end);
                }
            }

        }]);
