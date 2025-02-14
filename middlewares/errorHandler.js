function errorHandler(err, req, res, next) {
    console.error(err.stack);
    res.status(500).json({
      error: err.message || "Error interno del servidor",
      metodologia: "Se ha producido un error durante el procesamiento de la solicitud."
    });
  }
  
  module.exports = errorHandler;
  