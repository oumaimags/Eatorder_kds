const User = require('./models/User');

const addKitchenStaff = async (data) => {
    return await User.create(data);
};

const getAllKitchenStaff = async (idRestaurant) => {
    return await User.findAll({ where: { idrestaurant: idRestaurant } });
};

const getAllExpeditors = async (idRestaurant) => {
    return await User.findAll({ where: { idrestaurant: idRestaurant, role: 'EXPEDITOR' } });
};

const getAllUserByRestaurant = async (idRestaurant) => {
    return await User.findAll({ where: { idrestaurant: idRestaurant } });
};

const deleteById = async (id) => {
    return await User.destroy({ where: { id } });
};

const getAllStaffByStationAndROLEAndRestaurant = async (idRestaurant, idStation, roleName) => {
    return await User.findAll({ where: { idrestaurant: idRestaurant, idStation, role: roleName } });
};

const findById = async (id) => {
    return await User.findByPk(id);
};

module.exports = {
    addKitchenStaff,
    getAllKitchenStaff,
    getAllExpeditors,
    getAllUserByRestaurant,
    deleteById,
    getAllStaffByStationAndROLEAndRestaurant,
    findById
};
