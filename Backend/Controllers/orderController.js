// controllers/orderController.js
const Order = require('./models/Order');

// Récupérer toutes les commandes
const getAllOrders = async (req, res) => {
    try {
        const orders = await Order.getAll();
        res.json(orders);
    } catch (err) {
        console.error('❌ Erreur:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// Récupérer une commande par ID
const getById = async (req, res) => {
    const { id } = req.params;
    try {
        const order = await Order.getById(id);
        if (!order) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }
        res.json(order);
    } catch (err) {
        console.error('❌ Erreur:', err);
        res.status(500).json({ error: 'Erreur serveur' });
    }
};

// Mettre à jour le statut de la commande
const updateOrderStatus = async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; // En cours, prêt

    try {
        const order = await Order.getById(id);
        if (!order) {
            return res.status(404).json({ error: 'Commande non trouvée' });
        }

        await Order.updateStatus(id, status);
        res.json({ message: '✅ Statut de la commande mis à jour' });
    } catch (err) {
        console.error('❌ Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de la mise à jour' });
    }
};

module.exports = {
    getAllOrders,
    getById,
    updateOrderStatus
};

