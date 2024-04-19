const socketIo = require('socket.io');
const { saveChatMessage } = require('../controllers/chatController');

function configureSocket(server) {
  const io = socketIo(server);

  io.on('connection', (socket) => {
    console.log('Usuario conectado');

    socket.on('chat message', (msg) => {
      saveChatMessage(msg, (err, chat) => {
        if (err) {
          console.error('Error al guardar el mensaje:', err);
          return;
        }
        io.emit('chat message', chat);
      });
    });

    socket.on('disconnect', () => {
      console.log('Usuario desconectado');
    });
  });

  return io;
}

module.exports = {configureSocket}
