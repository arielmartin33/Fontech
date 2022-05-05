const db = require("../../database/models");
const sequelize = db.sequelize;

const usersController = {
  list: (req, res) => {
    db.User.findAll()
      .then((users) => {
        return res.status(200).json({
        count: users.length,
        user: users,
        status: 200
        });
      })
      .catch((err) => res.json(err));
  },
  detail: (req, res) => {
    db.User.findByPk(req.params.id)
      .then((user) => {
        return res.status(200).json({
          user: {
              id : user.id,
              first_name: user.first_name,
              last_name: user.last_name,
              email: user.email,
              imageUrl:user.imageUrl 
          },
          status: 200,
        });
      })
      .catch((err) => res.status(200).json(err));
  },
};

module.exports = usersController;