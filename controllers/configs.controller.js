const appConfigs = require('../configs/app.config.json');

module.exports.getAllAppConfigs = async (req, res) => {
    try {
        appConfigs ? res.send(appConfigs) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};

module.exports.getPaths = async (req, res) => {
    try {
        var baseDir = process.env.PWD;
        var absolutePaths = {};
        var publicPaths = {};

        absolutePaths.articles = baseDir + appConfigs.articlesImagesPaths;
        absolutePaths.events = baseDir + appConfigs.eventsImagesPaths;
        absolutePaths.ads = baseDir + appConfigs.adsImagesPaths;
        
        publicPaths.articles = appConfigs.articlesImagesPaths;
        publicPaths.events = appConfigs.eventsImagesPaths;
        publicPaths.ads = appConfigs.adsImagesPaths;

        var paths = {
            baseDir,
            absolutePaths,
            publicPaths
        }
        
        paths ? res.send(paths) : res.sendStatus(500);
    } catch (err) {
        res.send(err);
    }
};