module.exports = (sequelize, dataTypes) => {
    let alias = 'User';
    let cols = {
        id: {
                type: dataTypes.BIGINT(10),
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
        },
        first_name: {
            type: dataTypes.STRING(45),
            allowNull: false
        },
        last_name: {
            type: dataTypes.STRING(45),
            allowNull: true
        },
        email: {
            type: dataTypes.STRING(60),
            allowNull: false
        },
        password: {
            type: dataTypes.STRING(16),
            allowNull: true
        },
        create_time: {
            type: dataTypes.DATE(),
            allowNull: true
        },
        roles_id: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        }
    };

    let config = {
        tableName: "user",
        timestamps: false
    }
    const User = sequelize.define(alias, cols, config);

    User.associate = function (models) {
        User.belongsTo(models.Role, {
            as: 'roles',
            foreignKey: 'roles_id'
        }),
        User.hasMany(models.User_image, {
            as: 'user_images',
            foreignKey: 'user_id'
        })
    }
    return User;
}