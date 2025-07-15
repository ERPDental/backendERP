const router = require('express').Router();

// Ejemplo de ruta GET simple
router.get('/', (req, res) => {
  res.json({
    message: 'Example route is working!',
    timestamp: new Date().toISOString(),
    method: 'GET',
    endpoint: '/api/example'
  });
});

// Ejemplo de ruta POST simple
router.post('/', (req, res) => {
  res.json({
    message: 'Example POST route is working!',
    timestamp: new Date().toISOString(),
    method: 'POST',
    endpoint: '/api/example',
    body: req.body
  });
});

module.exports = router;
