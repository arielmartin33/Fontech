const req = require('express/lib/request');
const res = require('express/lib/response');

const db = require('../database/models');
const { Product } = require('../database/models');
const { Category } = require('../database/models');
const { Product_image } = require('../database/models');

module.exports = {
    create: (req, res) => {
        db.Category.findAll()
        .then((categories) => res.render('productCreate', { categories}))
        .catch(error => res.send(error))
    }, 
     store: async (req, res) => {
        const {files} = req;
        const {name, description, price, discount, offer, category } = req.body;
        try{
            const productCreated = await db.Product.create({
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
        db.Product.findAll({
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
        db.Product.findOne({ 
            where: {
                id: req.params.id
            },
            include: ['images']
        })

        .then(product => res.render('productDetail', { product }))
        .catch(error => res.send(error))
    },
 
  
    edit: async (req, res) => {
        db.Product.findByPk(req.params.id)
        .then (function (product){
            res.render('productEdit',{product:product})

        })
    },

    update: (req, res) =>{
        const {id} =req.params
        const {name, discount, price, description, offer} =req.body

        
        db.Product.update({
            name,
            discount,
            price,
            offer,
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

    delete: (req,res) => {
        let productId = req.params.id;
        db.Product_image.destroy(
            {where: {products_id:productId}}
        ) 
        db.Product.destroy(
            {
                where: {id: productId}
            },
            
            ) 
        
        .then(()=>{
             res.redirect('/products')})
        .catch(error => res.send(error)) 
    },
}
    






 
  
