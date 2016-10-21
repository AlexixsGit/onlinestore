function Pagination() {
    return {
        restrict: 'E',
        require: ['^ngModel'],
        scope: {
            ngModel: '=',
            totalItems: "=",
            boundaryLinks: "=",
            currentPage: "=",
            numberPerPage: "=",
            maxSize: "="
        },
        templateUrl: 'pagination.html',
        link: function (scope, element, attrs) {

            //Genera el componenete numero
            function generateNumber(num, text, active) {
                return {
                    number: num,
                    text: text,
                    active: active
                }
            }

            //Valida si es el ultimo registro
            function isLast() {
                return scope.ngModel === Math.ceil(scope.totalItems / scope.numberPerPage);
            }

            //Valida si es el primer registro
            function isFirst() {
                return scope.ngModel === 0
                    || scope.ngModel === 1;
            }

            var maxPages;
            var begin;
            var end;
            function doPaging() {

                //  Initializacion de variables
                if (!maxPages) {
                    begin = 1;
                    maxPages = scope.maxSize;
                }
                if (Math.ceil(scope.totalItems / scope.numberPerPage) < maxPages) {
                    maxPages = Math.ceil(scope.totalItems / scope.numberPerPage);
                    end = maxPages;
                }

                //Valida que no sea ni el primero ni el ultimo
                //Y aumenta o disminuye de pagina
                if (!isFirst() && !isLast()) {
                    if (scope.ngModel === maxPages) {
                        end = scope.ngModel + 1;
                        begin = begin + 1;
                        maxPages = maxPages + 1;
                    } else if (scope.ngModel === begin) {
                        end = end - 1;
                        begin = begin - 1;
                        maxPages = maxPages - 1;
                    }
                }

                //Llenado de los numeros a mostrar
                scope.numbers = [];
                for (var num = begin; num <= maxPages; num++) {
                    scope.numbers.push(generateNumber(num, num, num === scope.ngModel));
                }

            }

            //Cambio de pagina
            scope.changePage = function (pageNumber) {
                scope.ngModel = pageNumber;
                doPaging();
            }

            scope.next = function () {
                if (!isLast()) {
                    scope.ngModel = scope.ngModel + 1;
                    doPaging();
                }
            }

            scope.previous = function () {
                if (!isFirst()) {
                    scope.ngModel = scope.ngModel - 1;
                    doPaging();
                }
            }

            scope.$watch('boundaryLinks', function () {
                doPaging();
            });
        }

    }
}