const stationService = require('../services/stationService');

const getAllStations = async (req, res) => {
    try {
        const stations = await stationService.getAllStations();
        res.json(stations);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de la récupération des stations' });
    }
};

const addStation = async (req, res) => {
    try {
        const { idRestaurant } = req.query;
        const station = await stationService.addStation(req.body, idRestaurant);
        res.status(201).json(station);
    } catch (error) {
        res.status(500).json({ error: 'Erreur lors de l\'ajout de la station' });
    }
};

const addStaffToStation = async (req, res) => {
    try {
        const { idStation } = req.params;
        const result = await stationService.addStaffToStation(idStation, req.body);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

const deleteStation = async (req, res) => {
    try {
        const result = await stationService.deleteStation(req.params.id);
        res.json(result);
    } catch (error) {
        res.status(404).json({ error: error.message });
    }
};

module.exports = { getAllStations, addStation, addStaffToStation, deleteStation };
