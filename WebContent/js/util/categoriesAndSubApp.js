/**
 * Categorias y subcategorias disponibles en la tienda
 */

var categoriesAndSubApp = angular.module('categoriesAndSubApp', []);

//Categorias disponibles
categoriesAndSubApp.constant('categories', {
    "Men": "CATEGORY_MEN",
    "Female": "CATEGORY_FEMALE"
})

//Subcategorias niños, niñas
categoriesAndSubApp.constant('subCategories', {
    "Boy": "B",
    "Girl": "G"
})

//Subcategorias niños, niñas
categoriesAndSubApp.constant('itemCategory', {
    "Jacket": "JAC", //chaqueta
    "Coat": "COA", // buso
    "Pant": "PAN", //Pantalon
    "Jean": "JEN", //Jean
    "Shirt": "SHI", //Camisa
})

//Identifica si una prenda es coleccion nueva o vieja
categoriesAndSubApp.constant('itemCollection', {
    "New": "NEW_COLLECTION", //NUEVA
    "Old": "OLD_COLLECTION"//VIEJA
})