const router = require('express').Router();
const { DashboardController } = require('../controllers/DashboardControllerSimple');

const dashboardController = new DashboardController();

// Rutas para dashboard
router.get('/', (req, res) => dashboardController.getDashboard(req, res));
router.get('/stats', (req, res) => dashboardController.getStats(req, res));
router.get('/actividad', (req, res) => dashboardController.getActividadReciente(req, res));
router.get('/ingresos', (req, res) => dashboardController.getIngresosMensuales(req, res));

module.exports = router;
