const { Product } = require('../database/models');
const { Category } = require('../database/models');

// const mainController = {
    
    // index: (req, res) => {
    //     const response = products.filter(product => product.destacado == true)
    //     res.render('home', {products: response});
    // },

    module.exports = {
        index: (req, res) => {
            Product.findAll({
                where: {
                    visited: true,
                }
            })
            .then(products => res.render('home', { products }))
            .catch(error => res.send(error))
    },
}
    // register: (req, res) =>{
    //      return res.render('registro');
    //  },
    // login: (req, res) => {
    //     return res.render('login');
    // },
    // carrito: (req, res) => {
    //     return res.render('carrito');
    // },
    // products: (req, res) => {
    //     return res.render('products');
    // },
// }
// module.exports = mainController;