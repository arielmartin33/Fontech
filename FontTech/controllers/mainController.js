const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDB.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const mainController = {
    
    index: (req, res) => {
        res.render('home', {products});
    }
    // register: (req, res) =>{
    //     return res.render('registro');
    // },
    // login: (req, res) => {
    //     return res.render('login');
    // },
    // carrito: (req, res) => {
    //     return res.render('carrito');
    // },
    // products: (req, res) => {
    //     return res.render('products');
    // },
}
module.exports = mainController;