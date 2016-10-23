var childrenCollectionApp = angular.module('childrenCollectionApp', ['categoriesAndSubApp', 'constantsApp', 'directives']);

childrenCollectionApp.run(function () {
    console.log('Ingresando al método principal de children collection...');
    $('#childrenCollection').show();
    $('#childrenCollectionErrorDiv').hide();
})

childrenCollectionApp.controller('ChildrenCollectionController',
    ['$scope', '$http', '$window', 'categories', 'filterFilter',
        function ($scope, $http, $window, categories, filterFilter) {

            var childrenCollectionCtrl = this;

            $scope.filteredData = []
                , $scope.currentPage = 1
                , $scope.numPerPage = 15
                , $scope.maxSize = 5;


            childrenCollectionCtrl.view = {
                pageName: 'A tu estilo',
                title: 'Al mejor precio',
                divServiceTitle: 'Moda',
                divServicesSubTitle: 'Elige tu categoría',
                divLastCollectionTitle: 'Ropa para niños',
                divLastCollectionSubTitle: 'Lo más nuevo',
                headerButtonLabel: 'Explorar',
            }


            $scope.boundaryLinks = false;
            $scope.$watch('currentPage + numPerPage', function () {
                $http.get("../json/portfolioItems.json").then(function (response) {
                    childrenCollectionCtrl.portfolioItems = filterFilter(response.data.PortfolioItems, categories.Children);
                    $scope.boundaryLinks = true;
                    paginate();
                });
            });


            //Ir a comprar
            childrenCollectionCtrl.goToPurchase = function (itemSelected) {
                sessionStorage.setItem('itemSelectedToPurchase', JSON.stringify(itemSelected));
                $window.location.href = location.origin + '/OnlineStore/html/purchase.html';
            }

            //Regresar al inicio
            childrenCollectionCtrl.returnToHome = function () {
                $window.location.href = location.origin + '/OnlineStore/';
            }

            function paginate() {
                begin = (($scope.currentPage - 1) * $scope.numPerPage);
                end = begin + $scope.numPerPage;
                if (childrenCollectionCtrl.portfolioItems !== undefined) {
                    $scope.filteredData =
                        childrenCollectionCtrl.portfolioItems.slice(begin, end);
                }
            }

        }]);
