const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const pool = require('../utils/db');  // Ta connexion à la base de données
const { generateToken, comparePassword } = require('./utils/auth');

const router = express.Router();

// 📌 Login d'un utilisateur
router.post('/login', async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ error: 'Nom d\'utilisateur et mot de passe requis' });
    }

    try {
        // Chercher l'utilisateur dans la base de données
        const [user] = await pool.query('SELECT * FROM users WHERE username = ?', [username]);

        if (user.length === 0) {
            return res.status(404).json({ error: 'Utilisateur non trouvé' });
        }

        // Vérifier le mot de passe
        const isPasswordValid = comparePassword(password, user[0].password);
        if (!isPasswordValid) {
            return res.status(401).json({ error: 'Mot de passe incorrect' });
        }

        // Générer un JWT
        const token = generateToken(user[0]);

        res.json({
            message: 'Authentification réussie',
            token
        });

    } catch (err) {
        console.error('❌ Erreur lors de la connexion', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

module.exports = router;
