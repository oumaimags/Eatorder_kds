const User = require('./models/User');
const Role = require('./models/Role'); // Enum des rôles
const userService = require('../services/UserService');

// ➜ Ajouter un membre du personnel de cuisine
const addStaff = async (req, res) => {
    try {
        const newStaff = await userService.addKitchenStaff(req.body);
        res.status(201).json({ message: 'Kitchen staff added successfully', data: newStaff });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ➜ Récupérer tout le personnel de cuisine
const getAllKitchenStaff = async (req, res) => {
    try {
        const staffList = await userService.getAllKitchenStaff(req.params.idRestaurant);
        handleListResponse(res, 'Kitchen staff retrieved successfully', staffList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ➜ Récupérer tous les expéditeurs
const getAllExpeditors = async (req, res) => {
    try {
        const expeditorList = await userService.getAllExpeditors(req.params.idRestaurant);
        handleListResponse(res, 'Expeditors retrieved successfully', expeditorList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ➜ Récupérer tous les utilisateurs d'un restaurant
const getAllUsersByRestaurant = async (req, res) => {
    try {
        const users = await userService.getAllUserByRestaurant(req.params.idRestaurant);
        handleListResponse(res, 'Users retrieved successfully', users);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ➜ Supprimer un membre du personnel
const deleteStaff = async (req, res) => {
    try {
        await userService.deleteById(req.params.id);
        res.json({ message: 'Staff deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ➜ Récupérer le personnel selon station et rôle
const getAllStaffByStationAndRoleAndRestaurant = async (req, res) => {
    try {
        const { idRestaurant, idStation, roleName } = req.query;
        const staffList = await userService.getAllStaffByStationAndROLEAndRestaurant(idRestaurant, idStation, roleName);
        handleListResponse(res, 'Staff retrieved successfully', staffList);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// ➜ Récupérer un utilisateur par ID
const getUserById = async (req, res) => {
    try {
        const user = await userService.findById(req.params.id);
        handleSingleResponse(res, 'User retrieved successfully', user);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Fonctions de gestion des réponses
const handleListResponse = (res, message, list) => {
    if (!list || list.length === 0) {
        return res.status(404).json({ message: 'No data found' });
    }
    res.json({ message, data: list });
};

const handleSingleResponse = (res, message, user) => {
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }
    res.json({ message, data: user });
};

module.exports = {
    addStaff,
    getAllKitchenStaff,
    getAllExpeditors,
    getAllUsersByRestaurant,
    deleteStaff,
    getAllStaffByStationAndRoleAndRestaurant,
    getUserById
};
