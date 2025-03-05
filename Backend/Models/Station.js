const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');

const Station = sequelize.define('Station', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    statu:{
        type:DataTypes.STRING,
        allowNull:false
    }
    //nzid id resto+statu station 
}, {
    tableName: 'stations',
    timestamps: false
});
Station.belongsTo(print, { foreignKey: 'id' });

module.exports = Station;
