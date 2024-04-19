const express = require('express');
const router = express.Router();
const Chat = require('../models/Chat');

// Obtener todos los mensajes de chat
router.get('/messages', async (req, res, next) => {
    try {
        const messages = await Chat.find().sort({ timestamp: 'asc' });
        res.json(messages);
    } catch (err) {
        next(err);
    }
});

// Guardar un nuevo mensaje de chat
router.post('/messages', async (req, res, next) => {
    try {
        const { username, message } = req.body;
        const newChat = new Chat({ username, message });
        const savedChat = await newChat.save();
        res.status(201).json(savedChat);
    } catch (err) {
        next(err);
    }
});

module.exports = router;
