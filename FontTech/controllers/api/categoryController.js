const db = require("../../database/models");
const sequelize = db.sequelize;

const categoryController = {
  list: (req, res) => {
    db.Category.findAll()
      .then((categories) => {
        return res.status(200).json({
          count: categories.length,
          category: categories,
          status: 200,
        });
        
      })
      .catch((err) => res.json(err));
  },
 /*  detail: (req, res) => {
    db.Product.findByPk(req.params.id)
      .then((product) => {
        return res.status(200).json({
          product: product,
          status: 200,
        });
      })
      .catch((err) => res.status(200).json(err));
  }, */
};

module.exports = categoryController;