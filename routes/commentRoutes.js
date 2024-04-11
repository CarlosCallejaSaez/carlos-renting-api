const express = require('express');
const router = express.Router();
const commentController = require('../controllers/commentController');

// Ruta para obtener todos los comentarios
router.get('/', commentController.getAllComments);

// Ruta para obtener un comentario por su ID
router.get('/:id', commentController.getCommentById);

// Ruta para crear un nuevo comentario
router.post('/', commentController.createComment);

// Ruta para actualizar un comentario existente
router.put('/:id', commentController.updateComment);

// Ruta para eliminar un comentario
router.delete('/:id', commentController.deleteComment);

module.exports = router;
