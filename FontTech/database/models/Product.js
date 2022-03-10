module.exports = (sequelize, dataTypes) => {
    let cols = {
        idProduct: {
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        productName: {
            type: dataTypes.STRING
        },
        productDescription: {
            type: dataTypes.STRING
        },
        productPrice: {
            type: dataTypes.INTEGER
        },
        productOffer: {
            type: dataTypes.INTEGER
        },
        productDiscount: {
            type: dataTypes.INTEGER
        },
        productVisited: {
            type: dataTypes.BOOLEAN
        },
        categoryId: {
            type: dataTypes.INTEGER,
            foreignKey: true
        }
    };

    const Product = sequelize.define('Products', cols, config);
    let config = {
        tableName: "products",
        timestamps: false
    }

    return Product;
}