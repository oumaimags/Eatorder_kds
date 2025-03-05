const { DataTypes } = require('sequelize');
const sequelize = require('./config/database');

class Menu {
    constructor(id, name, description, price, createdAt, updatedAt) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.price = price;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
    }

    // Ajouter un plat
    static async addDish(name, description, price) {
        try {
            const [result] = await pool.query(
                'INSERT INTO menu (name, description, price) VALUES (?, ?, ?)',
                [name, description, price]
            );
            return new Menu(result.insertId, name, description, price, new Date(), new Date());
        } catch (err) {
            throw new Error('Erreur lors de l\'ajout du plat');
        }
    }

    // Modifier un plat
    static async updateDish(id, name, description, price) {
        try {
            const [result] = await pool.query(
                'UPDATE menu SET name = ?, description = ?, price = ? WHERE id = ?',
                [name, description, price, id]
            );
            if (result.affectedRows === 0) {
                throw new Error('Plat non trouvé');
            }
            return new Menu(id, name, description, price, new Date(), new Date());
        } catch (err) {
            throw new Error('Erreur lors de la modification du plat');
        }
    }

    // Supprimer un plat
    static async deleteDish(id) {
        try {
            const [result] = await pool.query('DELETE FROM menu WHERE id = ?', [id]);
            if (result.affectedRows === 0) {
                throw new Error('Plat non trouvé');
            }
            return true; // Plat supprimé
        } catch (err) {
            throw new Error('Erreur lors de la suppression du plat');
        }
    }

    // Récupérer un plat par son ID
    static async getDishById(id) {
        try {
            const [results] = await pool.query('SELECT * FROM menu WHERE id = ?', [id]);
            if (results.length === 0) {
                throw new Error('Plat non trouvé');
            }
            const dish = results[0];
            return new Menu(dish.id, dish.name, dish.description, dish.price, dish.created_at, dish.updated_at);
        } catch (err) {
            throw new Error('Erreur lors de la récupération du plat');
        }
    }

    // Récupérer tous les plats du menu
    static async getAllDishes() {
        try {
            const [dishes] = await pool.query('SELECT * FROM menu');
            return dishes.map(dish => new Menu(dish.id, dish.name, dish.description, dish.price, dish.created_at, dish.updated_at));
        } catch (err) {
            throw new Error('Erreur lors de la récupération des plats');
        }
    }
}

module.exports = Menu;
