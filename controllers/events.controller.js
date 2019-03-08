const _ = require('lodash');
var storages = require('../configs/storages.config');

/** models */
const Events = require('../models/Events');

module.exports.createEvents = async (req, res) => {
    const events = new Events(req.body);
    try {
        let newevents = await events.save();
        newevents ? res.send(newevents) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};

module.exports.getAllEvents = async (req, res) => {
    try {
        var skip = parseInt(req.query.skip) || 0;
        var limit = parseInt(req.query.limit) || '';
        let events = await Events
            .find(req.query.events)
            .populate({
                path: 'tags',
                match: req.query.tags,
            })
            .skip(skip)
            .limit(limit);
        events ? res.send(events) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};

module.exports.getEventsById = async (req, res) => {
    try {
        let events = await Events.findOne({
            '_id': req.params.id
        });
        events ? res.send(events) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};

module.exports.updateEventsById = async (req, res) => {
    try {
        let events = await Events.findByIdAndUpdate({
            _id: req.params.id
        }, req.body);
        events ? res.send(events) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};

module.exports.uploadsEventsImages = async (req, res) => {
    try {
        storages.eventsUploads(req, res, (err) => {
            if (err) throw err;
            if(!_.isEmpty(req.files)) res.send(req.files);
            else res.status(500).send('Broken');
        });    
    } catch (err) {
        res.send(err);
    }
};

module.exports.deleteEventsImages = async (req, res) => {
    try {
        let events = await Events.findOne({
            '_id': req.params.id
        });
        var pathToDelete = process.env.PWD + appConfigs.eventsImagesPaths + events.folder + '/' + events.image;
        var deleteStatus = files.removeFile(pathToDelete);
        deleteStatus ? res.send(deleteStatus) : res.sendStatus(404);
    } catch (err) {
        res.send(err);
    }
};