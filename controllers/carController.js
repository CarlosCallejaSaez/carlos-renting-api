const Car = require('../models/Car');

// Controlador para obtener todos los coches
exports.getAllCars = async (req, res) => {
  try {
    const cars = await Car.find();
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controlador para obtener un coche por su ID
exports.getCarById = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Coche no encontrado' });
    }
    res.json(car);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controlador para crear un nuevo coche
exports.createCar = async (req, res) => {
  const car = new Car({
    brand: req.body.brand,
    model: req.body.model,
    year: req.body.year,
    color: req.body.color,
    available: req.body.available || true
  });

  try {
    const newCar = await car.save();
    res.status(201).json(newCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controlador para actualizar un coche existente
exports.updateCar = async (req, res) => {
  try {
    const car = await Car.findById(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Coche no encontrado' });
    }
    if (req.body.brand != null) {
      car.brand = req.body.brand;
    }
    if (req.body.model != null) {
      car.model = req.body.model;
    }
    if (req.body.year != null) {
      car.year = req.body.year;
    }
    if (req.body.color != null) {
      car.color = req.body.color;
    }
    if (req.body.available != null) {
      car.available = req.body.available;
    }
    const updatedCar = await car.save();
    res.json(updatedCar);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.deleteCar = async (req, res) => {
  try {
    const car = await Car.findByIdAndDelete(req.params.id);
    if (!car) {
      return res.status(404).json({ message: 'Coche no encontrado' });
    }
    res.json({ message: 'Coche eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controlador para obtener todos los coches, con opción de filtrado por marca y/o año
exports.getAllCars = async (req, res) => {
  try {
    let query = {};
    if (req.query.brand) {
      query.brand = req.query.brand;
    }
    if (req.query.year) {
      query.year = req.query.year;
    }
    const cars = await Car.find(query);
    res.json(cars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controlador para obtener solo los coches disponibles
exports.getAvailableCars = async (req, res) => {
  try {
    const availableCars = await Car.find({ available: true });
    res.json(availableCars);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};