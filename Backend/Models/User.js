const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');

const User = sequelize.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    phoneNumber: {
        type: DataTypes.STRING
    },
    username: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    status: {
        type: DataTypes.STRING
    },
    email: {
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    company: {
        type: DataTypes.STRING
    },
    idrestaurant: {
        type: DataTypes.STRING
    }
}, {
    tableName: 'users', // Correspondance avec la table MySQL
    timestamps: false
});

const Role = require('./Role');
const Station = require('./Station');

User.belongsToMany(Role, {
    through: 'user_roles', 
    foreignKey: 'user_id',
    otherKey: 'role_id'
});

User.belongsTo(Station, { foreignKey: 'station_id' });

module.exports = User;

