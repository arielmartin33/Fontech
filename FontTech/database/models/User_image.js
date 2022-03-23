module.exports = (sequelize, dataTypes) => {
    let alias = 'User_image';
    let cols = {
        id: {
                type: dataTypes.BIGINT(10),
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
        },
        url: {
            type: dataTypes.STRING(60),
            allowNull: true
        },
        user_id: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        }
    };

    let config = {
        tableName: "user_images",
        timestamps: false
    }
    const User_image = sequelize.define(alias, cols, config);

    User_image.associate = function (models) {
        User_image.belongsTo(models.User, {
            as: 'user',
            foreignKey: 'user_id'
        })
    }

    return User_image;
}