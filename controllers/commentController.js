const Comment = require('../models/Comment');

// Controlador para obtener todos los comentarios, ordenados por fecha de creación descendente
exports.getAllComments = async (req, res) => {
    try {
      const comments = await Comment.find().sort({ createdAt: -1 }); // Orden descendente por createdAt
      res.json(comments);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };

// Controlador para obtener un comentario por su ID
exports.getCommentById = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    res.json(comment);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controlador para crear un nuevo comentario
exports.createComment = async (req, res) => {
  const comment = new Comment({
    reservation: req.body.reservation,
    user: req.body.user,
    text: req.body.text
  });

  try {
    const newComment = await comment.save();
    res.status(201).json(newComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controlador para actualizar un comentario existente
exports.updateComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    if (req.body.text != null) {
      comment.text = req.body.text;
    }
    const updatedComment = await comment.save();
    res.json(updatedComment);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controlador para eliminar un comentario
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);
    if (!comment) {
      return res.status(404).json({ message: 'Comentario no encontrado' });
    }
    res.json({ message: 'Comentario eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};