const express = require('express');
const { CitaController } = require('../controllers/CitaController');

const router = express.Router();
const citaController = new CitaController();

// Rutas para citas
router.get('/', citaController.getAllCitas.bind(citaController));
router.get('/hoy', citaController.getCitasHoy.bind(citaController));
router.get('/fecha/:fecha', citaController.getCitasByDate.bind(citaController));
router.get('/:id', citaController.getCitaById.bind(citaController));
router.post('/', citaController.createCita.bind(citaController));
router.put('/:id', citaController.updateCita.bind(citaController));
router.delete('/:id', citaController.deleteCita.bind(citaController));
router.patch('/:id/confirmar', citaController.confirmarCita.bind(citaController));
router.patch('/:id/cancelar', citaController.cancelarCita.bind(citaController));

module.exports = router;
