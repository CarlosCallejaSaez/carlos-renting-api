const mongoose = require('mongoose');

const sensorDataSchema = new mongoose.Schema({
  sensor: String,
  value: Number,
  timestamp: { type: Date, default: Date.now }
});

module.exports = mongoose.model('SensorData', sensorDataSchema);