const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');
require('dotenv').config();

const authRouter = require('../routes/auth');
const verifyToken = require('./middleware/authMiddleware'); // Middleware pour vérifier le token JWT
const pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
});

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(cors());

// Utiliser les routes d'authentification
app.use('/api/auth', authRouter);
// Utiliser les routes du menu
app.use('/api', menuRouter);
// Routes des commandes
app.use('/api', orderRouter);

// Routes d'impression
app.use('/api', printRouter);

// ========================== 🟢 GESTION DES UTILISATEURS ==========================

// Récupérer tous les utilisateurs
app.get('/api/users', verifyToken, async (req, res) => {
    try {
        const [users] = await pool.query('SELECT * FROM users');
        res.json(users);
    } catch (err) {
        console.error('❌ Erreur SQL:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Ajouter un utilisateur
app.post('/api/users', verifyToken, async (req, res) => {
    const { name, email } = req.body;

    if (!name || !email) {
        return res.status(400).json({ error: 'Nom et email requis' });
    }

    try {
        const [result] = await pool.query('INSERT INTO users (name, email) VALUES (?, ?)', [name, email]);
        res.json({ message: '✅ Utilisateur ajouté', id: result.insertId });
    } catch (err) {
        console.error('❌ Erreur SQL:', err);
        res.status(500).json({ error: 'Erreur lors de l\'ajout de l\'utilisateur' });
    }
});

// ========================== 🟢 GESTION DES STATIONS ==========================

// Récupérer toutes les stations
app.get('/api/stations', verifyToken, async (req, res) => {
    try {
        const [stations] = await pool.query('SELECT * FROM stations');
        res.json(stations);
    } catch (err) {
        console.error('❌ Erreur SQL:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
});

// Ajouter une station
app.post('/api/stations', verifyToken, async (req, res) => {
    const { name, description, idRestaurant } = req.body;

    if (!name || !idRestaurant) {
        return res.status(400).json({ error: 'Nom et ID du restaurant requis' });
    }

    try {
        const [result] = await pool.query(
            'INSERT INTO stations (name, description, id_restaurant) VALUES (?, ?, ?)',
            [name, description, idRestaurant]
        );
        res.json({ message: '✅ Station ajoutée', id: result.insertId });
    } catch (err) {
        console.error('❌ Erreur SQL:', err);
        res.status(500).json({ error: 'Erreur lors de l\'ajout de la station' });
    }
});

// Supprimer une station
app.delete('/api/stations/:id', verifyToken, async (req, res) => {
    const { id } = req.params;

    try {
        const [result] = await pool.query('DELETE FROM stations WHERE id = ?', [id]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Station non trouvée' });
        }

        res.json({ message: '✅ Station supprimée' });
    } catch (err) {
        console.error('❌ Erreur SQL:', err);
        res.status(500).json({ error: 'Erreur lors de la suppression de la station' });
    }
});

// Ajouter un employé à une station
app.post('/api/stations/:idStation/staff', verifyToken, async (req, res) => {
    const { idStation } = req.params;
    const { username, role } = req.body;

    if (!username) {
        return res.status(400).json({ error: 'Nom d\'utilisateur requis' });
    }

    try {
        // Vérifier si la station existe
        const [station] = await pool.query('SELECT * FROM stations WHERE id = ?', [idStation]);
        if (station.length === 0) {
            return res.status(404).json({ error: 'Station non trouvée' });
        }

        // Ajouter l'utilisateur à la station
        await pool.query('UPDATE users SET station_id = ? WHERE username = ?', [idStation, username]);

        res.json({ message: '✅ Utilisateur ajouté à la station', stationId: idStation, username, role });
    } catch (err) {
        console.error('❌ Erreur SQL:', err);
        res.status(500).json({ error: 'Erreur lors de l\'ajout du staff à la station' });
    }
});

// ========================== 🟢 LANCEMENT DU SERVEUR ==========================
app.listen(PORT, () => {
    console.log(`🚀 Serveur en cours sur http://localhost:${PORT}`);
});

