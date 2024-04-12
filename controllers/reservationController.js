const Reservation = require('../models/Reservation');

// Controlador para obtener todas las reservas
exports.getAllReservations = async (req, res) => {
  try {
    const reservations = await Reservation.find();
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controlador para obtener una reserva por su ID
exports.getReservationById = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.json(reservation);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controlador para crear una nueva reserva
exports.createReservation = async (req, res) => {
  const reservation = new Reservation({
    car: req.body.car,
    user: req.body.user,
    startDate: req.body.startDate,
    endDate: req.body.endDate,
    completed: req.body.completed || false
  });

  try {
    const newReservation = await reservation.save();
    res.status(201).json(newReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controlador para actualizar una reserva existente
exports.updateReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    if (req.body.car != null) {
      reservation.car = req.body.car;
    }
    if (req.body.user != null) {
      reservation.user = req.body.user;
    }
    if (req.body.startDate != null) {
      reservation.startDate = req.body.startDate;
    }
    if (req.body.endDate != null) {
      reservation.endDate = req.body.endDate;
    }
    if (req.body.completed != null) {
      reservation.completed = req.body.completed;
    }
    const updatedReservation = await reservation.save();
    res.json(updatedReservation);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controlador para eliminar una reserva
exports.deleteReservation = async (req, res) => {
  try {
    const reservation = await Reservation.findByIdAndDelete(req.params.id);
    if (!reservation) {
      return res.status(404).json({ message: 'Reserva no encontrada' });
    }
    res.json({ message: 'Reserva eliminada' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};