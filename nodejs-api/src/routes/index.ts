const apiRouter = require('express').Router();

apiRouter.use('/health-check', require('./health-check.routes'));
apiRouter.use('/example', require('./example.routes'));
// apiRouter.use('/users', require('./users.routes')); // Comentado temporalmente
apiRouter.use('/pacientes', require('./pacientes.routes'));
apiRouter.use('/dashboard', require('./dashboard.routes'));
apiRouter.use('/citas', require('./citas.routes'));

module.exports = apiRouter;