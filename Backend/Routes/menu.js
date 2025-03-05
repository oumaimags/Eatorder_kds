const express = require('express');
const router = express.Router();
const { addDish, updateDish, deleteDish, getAllDishes } = require('./controllers/menuController');

// Récupérer tous les plats du menu
router.get('/menu', getAllDishes);

// Ajouter un plat au menu
router.post('/menu', addDish);

// Modifier un plat du menu
router.put('/menu/:id', updateDish);

// Supprimer un plat du menu
router.delete('/menu/:id', deleteDish);

module.exports = router;
