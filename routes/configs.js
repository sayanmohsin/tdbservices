var express = require('express');
var router = express.Router();

/**
 * controllers
 */
var configsController = require('../controllers/configs.controller');

router.get('/app', configsController.getAllAppConfigs);

router.get('/paths', configsController.getPaths);

module.exports = router;