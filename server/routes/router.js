const express = require('express');
const { homeRoutes, addUserRoutes, updateUserRoutes } = require('../services/render');
const router = express.Router();
const controller = require('../controller/controller');

router.get('/', homeRoutes);

router.get('/add-user', addUserRoutes);

router.get('/update-user', updateUserRoutes);


// API URL
router.post('/api/users', controller.create);
router.get('/api/users', controller.find);
router.put('/api/users/:id', controller.update);
router.delete('/api/users/:id', controller.delete);

module.exports = router;