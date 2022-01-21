const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const controller = {
    // Muestro todos los productos
    index: (req, res) => {
        res.render('products', {products});
    },
    
    detail: (req, res) => {
        const id = req.params.id;
        const productSelected = products.filter(product => product.id == id);
        console.log(productSelected);
        res.render('product-detail', {productSelected});
    },

    create: (req, res) => {
        res.render('product-create');
    },
    store: (req, res) =>{
        res.send('guardo en el json el producto');
    },
    edit: (req, res) => {
        res.send('edicion del producto');
    },
    update: (req, res)=> {
        res.send('actualizo el producto editado');
    },
    destroy: (req, res)=>{
        res.send('elimino producto seleccionado');
    }

};

module.exports = controller