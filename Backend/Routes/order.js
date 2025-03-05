// routes/orderRoutes.js
const express = require('express');
const router = express.Router();
const { getAllOrders, updateOrderStatus } = require('./controllers/orderController');
const verifyToken = require('../middleware/authMiddleware');

// Récupérer toutes les commandes
router.get('/orders', verifyToken, getAllOrders);

// Mettre à jour le statut d'une commande
router.put('/orders/:id/status', verifyToken, updateOrderStatus);

module.exports = router;
