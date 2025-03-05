// models/Order.js
const mysql = require('mysql2/promise');
const pool = require('../db'); // Assurez-vous d'avoir votre fichier db.js de connexion

const Order = {
    // Récupérer toutes les commandes
    async getAll() {
        const [orders] = await pool.query('SELECT * FROM orders');
        return orders;
    },

    // Récupérer une commande par son ID
    async getById(id) {
        const [orders] = await pool.query('SELECT * FROM orders WHERE id = ?', [id]);
        return orders[0];
    },

    // Mettre à jour le statut d'une commande
    async updateStatus(id, status) {
        await pool.query('UPDATE orders SET status = ? WHERE id = ?', [status, id]);
    },

    // Ajouter une commande
    async add(order) {
        const { customerId, items, status } = order;
        const [result] = await pool.query(
            'INSERT INTO orders (customer_id, items, status) VALUES (?, ?, ?)',
            [customerId, items, status]
        );
        return result.insertId;
    }
};

module.exports = Order;
