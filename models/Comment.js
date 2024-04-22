const mongoose = require('mongoose');
const { validateCommentLength } = require('../middleware/commentMiddleware');

const commentSchema = new mongoose.Schema({
  reservation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    required: true
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  text: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Middleware para validar la longitud del campo text antes de guardar
commentSchema.pre('save', validateCommentLength);

module.exports = mongoose.model('Comment', commentSchema);
