// 1- Guardar usuario en la base de datos (json en este caso)
// 2- Buscar usuario que se quiere loguear por su e-mail.
// 3- BUscar a un usuario por su Id
// 4- Editar la información de un usuario
// 5- Eliminar un usuario de la bd
const fs = require('fs');

const Product = {

    fileName: './data/productsDB.json',

    getData: function () {
        return JSON.parse(fs.readFileSync(this.fileName, 'utf-8'));
    },
// devuelvo todo el contenido del json

    generateId: function () {
        let allProduct = this.findAll();
        let lastProduct = allProduct.pop(); // obtengo el ultimo producto
        if (lastProduct){
            return lastProduct.id + 1;
        }
        return 1;
    },

    findAll: function () {
        return this.getData();
    },

    findByPk: function (id) {
        let allProducts = this.findAll();
        let productFound = allProducts.find(oneProduct => oneProduct.id === id);
        return productFound;
    },

    findByField: function (field, text) {
        let allProducts = this.findAll();
        let productFound = allProducts.find(oneProduct => oneProduct[field] === text);
        return productFound;
    },

    create: function (productData) {
        let allProducts = this.findAll();
        let newProduct = {
            id: this.generateId(),
            ...productData
        }
        allProducts.push(newProduct);
        fs.writeFileSync(this.fileName, JSON.stringify(allProducts, null, ' '));
        return newProduct;
    },
    update: function (product) {
        let products = this.findAll();
        let updatedProducts = products.map(currentProduct =>{
            if (currentProduct.id == product.id){
                return currentProduct = product;
            }
            return currentProduct;
        });
        fs.writeFileSync(this.fileName, JSON.stringify(updatedProducts, null, ' '));
        return product.id;
    },
    destroy: function (id) {
        let allProducts = this.findAll();
        let finalProducts = allProducts.filter(oneProduct => oneProduct.id !== id);
        fs.writeFileSync(this.fileName, JSON.stringify(finalProducts, null, ' '));
        return true;
    }
}

module.exports = Product;