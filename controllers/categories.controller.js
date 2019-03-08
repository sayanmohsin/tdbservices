/** models */
const Categories = require('../models/Categories');

module.exports.createCategories = async (req, res) => {
    const categories = new Categories(req.body);
    try {
        let newcategories = await categories.save();
        newcategories ? res.send(newcategories) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};

module.exports.getAllCategories = async (req, res) => {
    try {
        var skip = parseInt(req.query.skip) || 0;
        var limit = parseInt(req.query.limit) || '';
        let categories = await Categories
            .find(req.query.categories)
            .skip(skip)
            .limit(limit);
        categories ? res.send(categories) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};

module.exports.getCategoriesById = async (req, res) => {
    try {
        let categories = await Categories.findOne({
            '_id': req.params.id
        });
        categories ? res.send(categories) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};

module.exports.updateCategoriesById = async (req, res) => {
    try {
        let categories = await Categories.findByIdAndUpdate({
            _id: req.params.id
        }, req.body);
        categories ? res.send(categories) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};