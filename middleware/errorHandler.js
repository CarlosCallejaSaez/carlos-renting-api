function errorHandler(err, req, res, next) {
    
    console.error(err.stack);
  
    if (err.name === 'ValidationError') {
      const errors = Object.values(err.errors).map(error => error.message);
      return res.status(400).json({ error: 'Validation Error', details: errors });
    } else if (err.name === 'UnauthorizedError') {
      return res.status(401).json({ error: 'Unauthorized', message: err.message });
    }

    return res.status(500).json({ error: 'Internal Server Error' });
  }
  
  module.exports = errorHandler;