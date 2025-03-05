const express = require('express');
const UserController = require('../controllers/UserController');

const router = express.Router();

router.post('/kitchen-staff', UserController.addStaff);
router.get('/kitchen-staff/:idRestaurant', UserController.getAllKitchenStaff);
router.get('/expeditors/:idRestaurant', UserController.getAllExpeditors);
router.get('/users/:idRestaurant', UserController.getAllUsersByRestaurant);
router.delete('/staff/:id', UserController.deleteStaff);
router.get('/staff', UserController.getAllStaffByStationAndRoleAndRestaurant);
router.get('/user/:id', UserController.getUserById);

module.exports = router;
