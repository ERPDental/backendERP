const router = require('express').Router();
const { PacienteController } = require('../controllers/PacienteController');

const pacienteController = new PacienteController();

// Rutas específicas primero (antes de /:id)
router.get('/total', (req, res) => pacienteController.getTotalPacientes(req, res));
router.get('/search', (req, res) => pacienteController.searchPacientes(req, res));

// Rutas generales
router.get('/', (req, res) => pacienteController.getAllPacientes(req, res));
router.get('/:id', (req, res) => pacienteController.getPacienteById(req, res));
router.post('/', (req, res) => pacienteController.createPaciente(req, res));
router.put('/:id', (req, res) => pacienteController.updatePaciente(req, res));
router.delete('/:id', (req, res) => pacienteController.deletePaciente(req, res));

module.exports = router;
