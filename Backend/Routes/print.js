// routes/printRoutes.js
const express = require('express');
const router = express.Router();
const { printOrderTicket } = require('./controllers/printController');
const verifyToken = require('../middleware/authMiddleware');

// Imprimer un ticket de commande
router.post('/print/:id', verifyToken, printOrderTicket);

module.exports = router;

