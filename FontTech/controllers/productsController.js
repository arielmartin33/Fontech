const req = require('express/lib/request');
const res = require('express/lib/response');

const db = require('../database/models');
const { Product } = require('../database/models');
const { Category } = require('../database/models');
const { Product_image } = require('../database/models');

module.exports = {
    create: (req, res) => {
        Category.findAll()
        .then((categories) => res.render('productCreate', { categories}))
        .catch(error => res.send(error))
    }, 
     store: async (req, res) => {
        const {files} = req;
        const {name, description, price, discount, offer, category } = req.body;
        try{
            const productCreated = await Product.create({
                name,
                description, 
                price,
                discount,
                offer, 
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
    },
    index: (req, res) => {
        Product.findAll({
            order: [
                ['price', 'DESC']
            ],
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
            res.render('products', {products:data})

        })
        .catch(error => res.send(error))
    },
    detail: (req, res) => {
        Product.findOne({ 
            where: {
                id: req.params.id
            },
            include: ['images']
        })

        .then(product => res.render('productDetail', { product }))
        .catch(error => res.send(error))
    },
 
  
    edit: async (req, res) => {
        Product.findByPk(req.params.id)
        .then (function (product){
            res.render('productEdit',{product:product})

        })
    },

    update: (req, res) =>{
        const {id} =req.params
        const {name, discount, price, description} =req.body

        
        db.Product.update({
            name,
            discount,
            price,
            
            description
        },{
            where:{
                id
            }
        })
        .then(()=>{
            res.redirect('/products')
        })
        .catch(err =>console.log(err))
    },

}
    






 
  
