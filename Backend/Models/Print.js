// models/Print.js
const printer = require('printer');  // Bibliothèque pour interagir avec l'imprimante
const mysql = require('mysql2/promise');
const pool = require('../db'); // Connexion à la base de données

const print= sequelize.define('print', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
});
module.exports = Print;

// a corriger (print+order)