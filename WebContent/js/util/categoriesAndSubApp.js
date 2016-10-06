/**
 * Categorias y subcategorias disponibles en la tienda
 */

var categoriesAndSubApp = angular.module('categoriesAndSubApp', []);

//Categorias disponibles
categoriesAndSubApp.constant('categories', {
    "Men": "M",
    "Female": "F"
})

//Subcategorias niños, niñas
categoriesAndSubApp.constant('subCategories', {
    "Boy": "B",
    "Girl": "G"
})

//Subcategorias niños, niñas
itemCategory.constant('itemCategory', {
    "Jacket": "JAC", //chaqueta
    "Coat": "COA", // buso
    "Pant": "PAN", //Pantalon
    "Jean": "JEN", //Jean
    "Shirt": "SHI", //Camisa
})