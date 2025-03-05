const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');
const Order = require('./Order');
const Menu = require('./menu');

const product = sequelize.define('product', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    price:{
        type:Datatype.INTEGER
    }
});
product.belongsToMany(Order, {
    through: 'id', 
    foreignKey: 'id',
    otherKey: 'id'
});

product.belongsTo(Order, { foreignKey: 'id' });
product.belongsTo(menu, { foreignKey: 'id' });

module.exports = User;
