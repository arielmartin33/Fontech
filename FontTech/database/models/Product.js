module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
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
        },
        description: {
            type: dataTypes.STRING(45),
            allowNull: true
        },
        price: {
            type: dataTypes.DECIMAL(11,2),
            allowNull: false
        },
        offer: {
            type: dataTypes.BOOLEAN,
            allowNull: true
        },
        discount: {
            type: dataTypes.BIGINT(2),
            allowNull: true
        },
        visited: {
            type: dataTypes.BOOLEAN,
            allowNull: true
        },
        categories_id: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        }
    };

    let config = {
        tableName: "products",
        timestamps: false
    }
    const Product = sequelize.define(alias, cols, config);

    Product.associate = function (models) {
        Product.belongsTo(models.Category, {
            as: 'category',
            foreignKey: 'categories_id'
        }),
        Product.hasMany(models.Product_image, {
            as: 'images',
            foreignKey: 'products_id'
        })
    }
    return Product;
}