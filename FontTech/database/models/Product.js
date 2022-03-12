module.exports = (sequelize, dataTypes) => {
    let alias = 'Product';
    let cols = {
        idProduct: {
                    type: dataTypes.BIGINT(10),
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
        },
        productName: {
            type: dataTypes.STRING(200),
            allowNull: false
        },
        productDescription: {
            type: dataTypes.STRING(200),
            allowNull: true
        },
        productPrice: {
            type: dataTypes.DECIMAL(9,0),
            allowNull: false
        },
        productOffer: {
            type: dataTypes.BOOLEAN,
            allowNull: true
        },
        productDiscount: {
            type: dataTypes.BIGINT(2),
            allowNull: true
        },
        productVisited: {
            type: dataTypes.BOOLEAN,
            allowNull: true
        },
        categoryId: {
            type: dataTypes.BIGINT(10)
        },
        productImage: {
            type: dataTypes.STRING(300)
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
            foreignKey: 'categoryId'
        })
    }

    return Product;
}