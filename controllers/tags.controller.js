/** models */
const Tags = require('../models/Tags');

module.exports.createTags = async (req, res) => {
    const tags = new Tags(req.body);
    try {
        let newtags = await tags.save();
        newtags ? res.send(newtags) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};

module.exports.getAllTags = async (req, res) => {
    try {
        var skip = parseInt(req.query.skip) || 0;
        var limit = parseInt(req.query.limit) || '';
        let tags = await Tags
            .find(req.query.tags)
            .skip(skip)
            .limit(limit);
        tags ? res.send(tags) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};

module.exports.getTagsById = async (req, res) => {
    try {
        let tags = await Tags.findOne({
            '_id': req.params.id
        });
        tags ? res.send(tags) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};

module.exports.updateTagsById = async (req, res) => {
    try {
        let tags = await Tags.findByIdAndUpdate({
            _id: req.params.id
        }, req.body);
        tags ? res.send(tags) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};