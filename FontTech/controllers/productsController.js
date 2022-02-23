const fs = require('fs');
const path = require('path');
const Product = require('../models/Product')

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
        res.render('productDetail', {productSelected});
    },
    create: (req, res) => {
        res.render('productCreate');
    },
    store: (req, res) =>{
        let newProduct = {
            id: products[products.length -1].id + 1,
            ...req.body,
            images:req.files.map(function (file) {
                return file.filename;
            })
        }
        console.log(newProduct);
        Product.create(newProduct);
        res.render('products',{products});

    },
    edit: (req, res) => {
        let idProduct = req.params.id;
        let productToEdit = Product.findByPk(idProduct)
        res.render('productEdit', {productToEdit});
    },
    update: (req, res)=> {
        req.body.id = req.params.id;
        /* Si adjunta una imagen la guardamos, si no, mantenemos la imagen anterior */
        req.body.image = req.file ? req.file.filename : req.body.oldImage;
        Product.update(req.body);
        res.redirect('/products/' + req.params.id);
    },
    delete: (req, res)=>{
        Product.destroy(req.params.id)
        res.redirect('/products');
    }

};

module.exports = controller