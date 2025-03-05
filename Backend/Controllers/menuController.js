const Menu = require('./models/Menu');

// Ajouter un plat
const addDish = async (req, res) => {
    const { name, description, price } = req.body;
    try {
        if (!name || !price) {
            return res.status(400).json({ error: 'Nom et prix sont requis' });
        }

        const newDish = await Menu.addDish(name, description, price);
        res.json({ message: 'Plat ajouté avec succès', dish: newDish });
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de l\'ajout du plat' });
    }
};

// Modifier un plat
const updateDish = async (req, res) => {
    const { id } = req.params;
    const { name, description, price } = req.body;

    try {
        if (!name || !price) {
            return res.status(400).json({ error: 'Nom et prix sont requis' });
        }

        const updatedDish = await Menu.updateDish(id, name, description, price);
        res.json({ message: 'Plat modifié avec succès', dish: updatedDish });
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de la modification du plat' });
    }
};

// Supprimer un plat
const deleteDish = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await Menu.deleteDish(id);
        if (!result) {
            return res.status(404).json({ error: 'Plat non trouvé' });
        }
        res.json({ message: 'Plat supprimé avec succès' });
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de la suppression du plat' });
    }
};

// Récupérer tous les plats
const getAllDishes = async (req, res) => {
    try {
        const dishes = await Menu.getAllDishes();
        res.json(dishes);
    } catch (err) {
        console.error('Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de la récupération des plats' });
    }
};

module.exports = { addDish, updateDish, deleteDish, getAllDishes };
