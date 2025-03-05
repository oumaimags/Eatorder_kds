// controllers/printController.js
const Print = require('./models/Print');

// Imprimer les tickets pour une commande
const printOrderTicket = async (req, res) => {
    const { id } = req.params;

    try {
        // Vérifier si la commande est prête
        const isReady = await Print.checkOrderReady(id);
        if (!isReady) {
            return res.status(400).json({ error: 'Commande non prête à être imprimée' });
        }

        // Tenter d'imprimer le ticket
        const printSuccess = await Print.printTicket(id);
        if (!printSuccess) {
            return res.status(500).json({ error: 'Erreur lors de l\'impression du ticket' });
        }

        res.json({ message: '✅ Ticket imprimé avec succès' });
    } catch (err) {
        console.error('❌ Erreur:', err);
        res.status(500).json({ error: 'Erreur lors de l\'impression' });
    }
};

module.exports = {
    printOrderTicket
};

