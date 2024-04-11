const express = require('express');
const router = express.Router();
const carController = require('../controllers/carController');

// Ruta para obtener todos los coches
router.get('/', carController.getAllCars);

// Ruta para obtener un coche por su ID
router.get('/:id', carController.getCarById);

// Ruta para crear un nuevo coche
router.post('/', carController.createCar);

// Ruta para actualizar un coche existente
router.put('/:id', carController.updateCar);

// Ruta para eliminar un coche
router.delete('/:id', carController.deleteCar);

module.exports = router;


// Ruta para obtener solo los coches disponibles
router.get('/available', carController.getAvailableCars);