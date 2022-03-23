const { Product } = require('../database/models');
const { Category } = require('../database/models');
const { Product_image } = require('../database/models');

module.exports = {
    index: (req, res) => {
        Product.findAll({
            order: [
                ['price', 'DESC']
            ]
        })
        .then(products => {
            res.render('products', {products})
        })
        .catch(error => res.send(error))
    },
    detail: (req, res) => {
        Product.findByPk(req.params.id)
        .then(product => res.render('productDetail', { product }))
        .catch(error => res.send(error))
    },
    create: (req, res) => {
        Category.findAll()
        .then((categories) => res.render('productCreate', { categories}))
        .catch(error => res.send(error))
    },
    store: async (req, res) => {
        const {files} = req;
        const {name, description, price, discount, category } = req.body;
        try{
            const productCreated = await Product.create({
                name,
                description, 
                price,
                discount, 
                categories_id: category 
            })
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                
                await Product_image.create({
                    products_id: productCreated.id,
                    url: file.filename
                })
            }
            res.redirect('products')
        }catch(error){
            res.send(error)
        }
    }

}
