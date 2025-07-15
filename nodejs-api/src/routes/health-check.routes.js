const router = require('express').Router();

router.get('/', [], (req, res) => {
  console.log('API is running');

  res.status(200).json({
    status: 'true',
    message: 'API is running',
    data: {},
  });
});



module.exports = router;
