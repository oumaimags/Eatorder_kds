const Station = require('./models/Station');

const getAllStations = async () => {
    const [rows] = await pool.query('SELECT * FROM stations');
    return rows;
};

const addStation = async (stationDTO, idRestaurant) => {
    const { name, description } = stationDTO;
    const [result] = await pool.query(
        'INSERT INTO stations (name, description, id_restaurant) VALUES (?, ?, ?)',
        [name, description, idRestaurant]
    );
    return { id: result.insertId, name, description, idRestaurant };
};

const addStaffToStation = async (idStation, userModel) => {
    const { username, role } = userModel;
    const [station] = await pool.query('SELECT * FROM stations WHERE id = ?', [idStation]);

    if (station.length === 0) throw new Error('Station non trouvée');

    await pool.query('UPDATE users SET station_id = ? WHERE username = ?', [idStation, username]);

    return { message: 'Utilisateur ajouté à la station', stationId: idStation, username, role };
};

const deleteStation = async (id) => {
    const [station] = await pool.query('SELECT * FROM stations WHERE id = ?', [id]);

    if (station.length === 0) throw new Error('Station non trouvée');

    await pool.query('DELETE FROM stations WHERE id = ?', [id]);

    return { message: 'Station supprimée avec succès' };
};

module.exports = { getAllStations, addStation, addStaffToStation, deleteStation };
