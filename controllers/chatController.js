const mongoose = require('mongoose');
const Chat = require('../models/Chat');

const saveChatMessage = (msg, callback) => {
    const newChat = new Chat({ username: msg.username, message: msg.message });
    newChat.save((err, chat) => {
        if (err) {
            callback(err, null);
            return;
        }
        callback(null, chat);
    });
};

module.exports = { saveChatMessage };