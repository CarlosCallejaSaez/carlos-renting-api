function validateCommentLength(next) {
    if (this.text.length >= 20) {
      next();
    } else {
      const error = new Error('El texto debe tener al menos 20 caracteres.');
      next(error);
    }
  }
  
  module.exports = {
    validateCommentLength
  };