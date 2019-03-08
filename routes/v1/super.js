var express = require('express');
var router = express.Router();

/**
 * Controllers
 */
var categoriesController = require('../../controllers/categories.controller');
var tagsController = require('../../controllers/tags.controller');
var articlesController = require('../../controllers/articles.controller');
var eventsController = require('../../controllers/events.controller');

var adminsController = require('../../controllers/admins.controller');

/**
 * admins
 */
router.get('/admins', adminsController.getAllAdmins);

router.get('/admins/:id', adminsController.getAdminsById);

router.get('/adminsp/:id', adminsController.getAdminsByIdWithPw);

router.post('/admins', adminsController.createAdmins);

router.put('/admins', adminsController.updateAdmins);

/**
 * categories
 */

router.get('/categories', categoriesController.getAllCategories);

router.get('/categories/:id', categoriesController.getCategoriesById);

router.post('/categories', categoriesController.createCategories);

router.put('/categories/:id', categoriesController.updateCategoriesById);

/**
 * tags
 */
router.get('/tags', tagsController.getAllTags);

router.get('/tags/:id', tagsController.getTagsById);

router.post('/tags', tagsController.createTags);

router.put('/tags/:id', tagsController.updateTagsById);

/**
 * articles
 */
router.get('/articles', articlesController.getAllArticles);

router.get('/articles/:id', articlesController.getArticlesById);

router.post('/articles', articlesController.createArticles);

router.put('/articles/:id', articlesController.updateArticlesById);

router.post('/uploads/articles', articlesController.uploadsArticlesImages);

router.delete('/uploads/articles/:id', articlesController.deleteArticlesImages);

/**
 * events
 */
router.get('/events', eventsController.getAllEvents);

router.get('/events/:id', eventsController.getEventsById);

router.post('/events', eventsController.createEvents);

router.put('/events/:id', eventsController.updateEventsById);

router.post('/uploads/events', eventsController.uploadsEventsImages);

router.delete('/uploads/events/:id', eventsController.deleteEventsImages);

module.exports = router;