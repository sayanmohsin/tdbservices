var express = require('express');
var router = express.Router();

/**
 * Controllers
 */
var categoriesController = require('../../controllers/categories.controller');
var tagsController = require('../../controllers/tags.controller');
var articlesController = require('../../controllers/articles.controller');
var eventsController = require('../../controllers/events.controller');

/**
 * categories
 */

router.get('/categories', categoriesController.getAllCategories);

router.get('/categories/:id', categoriesController.getCategoriesById);

/**
 * tags
 */
router.get('/tags', tagsController.getAllTags);

router.get('/tags/:id', tagsController.getTagsById);


/**
 * articles
 */
router.get('/articles', articlesController.getAllArticles);

router.get('/articles/:id', articlesController.getArticlesById);

router.post('/articles', articlesController.createArticles);

router.put('/articles/:id', articlesController.updateArticlesById);

router.post('/uploads/articles', articlesController.uploadsArticlesImages);

/**
 * events
 */
router.get('/events', eventsController.getAllEvents);

router.get('/events/:id', eventsController.getEventsById);

router.post('/events', eventsController.createEvents);

router.put('/events/:id', eventsController.updateEventsById);

router.post('/uploads/events', eventsController.uploadsEventsImages);

module.exports = router;