/** models */
const Admins = require('../models/Admins');

module.exports.createAdmins = async (req, res) => {
    const admins = new Admins(req.body);
    try{
        let newAdmins = await admins.save();
        newAdmins ? res.send(newAdmins) : res.sendStatus(404);
    }catch(err){
        res.send(err);
    }
};

module.exports.getAllAdmins = async (req, res) => {
    try{
        let admins = await Admins.find(req.query);
        admins ? res.send(admins) : res.sendStatus(404);
    }catch(err){
        res.send(err);
    }
};

module.exports.getAllAdminsWithPw = async (req, res) => {
    try{
        let admins = await Admins.find(req.query).select("+password");
        admins ? res.send(admins) : res.sendStatus(404);
    }catch(err){
        res.send(err);
    }
};

module.exports.getAdminsById = async (req, res) => {
    try{
        let admins = await Admins.findOne({ '_id': req.params.id });
        admins ? res.send(admins) : res.sendStatus(404);
    }catch(err){
        res.send(err);
    }
};

module.exports.getAdminsByIdWithPw = async (req, res) => {
    try{
        let admins = await Admins.findOne({ '_id': req.params.id }).select("+password");
        admins ? res.send(admins) : res.sendStatus(404);
    }catch(err){
        res.send(err);
    }
};

module.exports.updateAdmins = async (req, res) => {
    try{
        let admins = await Admins.findByIdAndUpdate({_id: req.params.id}, req.body);
        admins ? res.send(admins) : res.sendStatus(404);
    }catch(err){
        res.send(err);
    }
};