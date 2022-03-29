module.exports = (sequelize, dataTypes) => {
    let alias = 'Role';
    let cols = {
        id: {
            type: dataTypes.BIGINT(10),
            primaryKey: true,
            allowNull: false,
            autoIncrement: true
        },
        name: {
            type: dataTypes.STRING(45),
            allowNull: false
        }
    };
    let config = {
        tableName: 'roles',
        timestamps: false
    }
    const Role = sequelize.define(alias, cols, config);

    Role.associate = function (models) {
        Role.hasMany(models.User, {
            as: 'user',
            foreignKey: 'roles_id'
        })
    }
    return Role;
}