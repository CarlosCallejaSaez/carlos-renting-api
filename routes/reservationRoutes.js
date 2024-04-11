const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');

// Ruta para obtener todas las reservas
router.get('/', reservationController.getAllReservations);

// Ruta para obtener una reserva por su ID
router.get('/:id', reservationController.getReservationById);

// Ruta para crear una nueva reserva
router.post('/', reservationController.createReservation);

// Ruta para actualizar una reserva existente
router.put('/:id', reservationController.updateReservation);

// Ruta para eliminar una reserva
router.delete('/:id', reservationController.deleteReservation);

module.exports = router;
