module.exports = (sequelize, dataTypes) => {
    let alias = 'Product_image';
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
        products_id: {
            type: dataTypes.BIGINT(10),
            allowNull: false
        }
    };

    let config = {
        tableName: "product_images",
        timestamps: false
    }
    const Product_image = sequelize.define(alias, cols, config);

    Product_image.associate = function (models) {
        Product_image.belongsTo(models.Product, {
          
            as: 'products',
            foreignKey: 'products_id'
        })
    }

    return Product_image;
}