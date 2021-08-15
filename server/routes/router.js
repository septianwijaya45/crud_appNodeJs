const express = require('express');
const { homeRoutes, addUserRoutes, updateUserRoutes } = require('../services/render');
const router = express.Router();

router.get('/', homeRoutes);

router.get('/add-user', addUserRoutes);

router.get('/update-user', updateUserRoutes);

module.exports = router;