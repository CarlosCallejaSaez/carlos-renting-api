const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

// Controlador para obtener todos los usuarios
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.json(users);
    } catch (err) {
      res.status(500).json({ message: err.message });
    }
  };
  
// Controlador para obtener un usuario por su ID
exports.getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Controlador para crear un nuevo usuario
exports.createUser = async (req, res) => {
  const { username, password, isAdmin } = req.body;

  try {
    // Encriptar la contraseña
    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear un nuevo usuario con la contraseña encriptada
    const user = new User({
      username: username,
      password: hashedPassword,
      isAdmin: isAdmin || false
    });

    // Guardar el nuevo usuario en la base de datos
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controlador para actualizar un usuario existente
exports.updateUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    if (req.body.username != null) {
      user.username = req.body.username;
    }
    if (req.body.password != null) {
      user.password = req.body.password;
    }
    if (req.body.isAdmin != null) {
      user.isAdmin = req.body.isAdmin;
    }
    const updatedUser = await user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// Controlador para eliminar un usuario
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json({ message: 'Usuario eliminado' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// Función Login
exports.loginUser = async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      console.log('User not found:', username);
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Check password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      console.log('Invalid password for user:', username);
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // Generate JWT token
    const accessToken = jwt.sign({ username: user.username, isAdmin: user.isAdmin }, process.env.ACCESS_TOKEN_SECRET);

    // Return token to client
    res.json({ accessToken });
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).json({ message: 'Error interno del servidor' });
  }
};