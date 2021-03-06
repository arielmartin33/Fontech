const db = require("../../database/models");
const sequelize = db.sequelize;
const Product = db.Producto;

const productsController = {
  list:  (req, res) => {
    db.Product.findAll()
      .then((products) => {
        return res.status(200).json({
          count: products.length,
          products: products,
          status: 200,
        });
      })
      .catch((err) => res.json(err));
  }, 


  detail: (req, res) => {
    db.Product.findByPk(req.params.id)
      .then((product) => {
        return res.status(200).json({
          product: product,
          status: 200,
        });
      })
      .catch((err) => res.status(200).json(err));
  },  
};

module.exports = productsController;