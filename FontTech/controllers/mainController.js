const { Product } = require('../database/models');
const { Category } = require('../database/models');
const db = require('../database/models');

// const mainController = {
    
    // index: (req, res) => {
    //     const response = products.filter(product => product.destacado == true)
    //     res.render('home', {products: response});
    // },

    module.exports = {
        index: (req, res) => {
            db.Product.findAll({
                where: {
                    offer: true,
                },
                include: [
                    'images'
                ]
            })
            .then(products => {
                const data = products.map(product => {
                    const image = product.images.length > 0 ? product.images[0].url : 'default.jpg'
                    return {
                        ...product.dataValues,
                        image
                    }
                })
                res.render('home', {products:data})
    
            })
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