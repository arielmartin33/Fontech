const { Product } = require('../database/models');
const { Category } = require('../database/models');

module.exports = {
    index: (req, res) => {
        Product.findAll({
            order: [
                ['productPrice', 'DESC']
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
        const {name, description, category, price, destacado } = req.body;
        try{
            const productCreated = await Product.create({
                name,
                description, 
                category, 
                price, 
                destacado,
            })
            for (let index = 0; index < files.length; index++) {
                const file = files[index];
                
                await productImage.create({
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
// const controller = {
    // Muestro todos los productos
    
    // detail: (req, res) => {
    //     const id = req.params.id;
    //     const productSelected = products.filter(product => product.id == id);
    //     res.render('productDetail', {productSelected});
    // },
    // create: (req, res) => {
    //     res.render('productCreate');
    // },
    // store: (req, res) =>{
    //     let newProduct = {
    //         id: products[products.length -1].id + 1,
    //         ...req.body,
    //         images:req.files.map(function (file) {
    //             return file.filename;
    //         })
    //     }
    //     Product.create(newProduct);
    //     // res.render('products',{products});
    //     res.redirect('products');

    // },
    // edit: (req, res) => {
    //     let idProduct = req.params.id;
    //     let productToEdit = Product.findByPk(idProduct)
    //     res.render('productEdit', {productToEdit});
    // },
    // update: (req, res)=> {
    //     req.body.id = req.params.id;
    //     /* Si adjunta una imagen la guardamos, si no, mantenemos la imagen anterior */
    //     req.body.image = req.file ? req.file.filename : req.body.oldImage;
    //     Product.update(req.body);
    //     res.redirect('/products/' + req.params.id);
    // },
    // delete: (req, res)=>{
    //     Product.destroy(req.params.id)
    //     res.redirect('/products');
    // }

// };

// module.exports = controller