const _ = require('lodash');
var appConfigs = require('../configs/app.config.json');

var storages = require('../configs/storages.config');

/** helpers */
const files = require('../helpers/files.helper');

/** models */
const Articles = require('../models/Articles');

module.exports.createArticles = async (req, res) => {
    const articles = new Articles(req.body);
    try {
        let newarticles = await articles.save();
        newarticles ? res.send(newarticles) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};

module.exports.getAllArticles = async (req, res) => {
    try {
        var skip = parseInt(req.query.skip) || 0;
        var limit = parseInt(req.query.limit) || '';
        let articles = await Articles
            .find(req.query.articles)
            .populate([{
                path: 'categories',
                match: req.query.categories,
            },{
                path: 'tags',
                match: req.query.tags,
            }])
            .skip(skip)
            .limit(limit);
        if(req.query.articles||req.query.categories||req.query.tags){
            articles = _.filter(articles, function(article) { return article.categories != null; });
        }
        articles ? res.send(articles) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};

module.exports.getArticlesById = async (req, res) => {
    try {
        let articles = await Articles.findOne({
            '_id': req.params.id
        });
        articles ? res.send(articles) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};

module.exports.updateArticlesById = async (req, res) => {
    try {
        let articles = await Articles.findByIdAndUpdate({
            _id: req.params.id
        }, req.body);
        articles ? res.send(articles) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};

module.exports.uploadsArticlesImages = async (req, res) => {
    try {
        storages.articlesUploads(req, res, (err) => {
            if (err) throw err;
            if(!_.isEmpty(req.files)) res.send(req.files);
            else res.status(500).send('Broken');
        });    
    } catch (err) {
        res.send(err);
    }
};

module.exports.deleteArticlesImages = async (req, res) => {
    try {
        let articles = await Articles.findOne({
            '_id': req.params.id
        });
        var pathToDelete = process.env.PWD + appConfigs.articlesImagesPaths + articles.folder;
        var deleteStatus = files.removeFile(pathToDelete);
        deleteStatus ? res.send(deleteStatus) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};