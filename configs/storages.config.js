const multer  = require('multer');
var path = require('path');
var crypto = require('crypto');
var files = require('../helpers/files.helper');
var appConfigs = require('../configs/app.config.json');

var storagesArticles = multer.diskStorage({
	destination: async (req, file, cb) => {

		var folderExist = true;
		var folderpath ='';
		var foldername = '';
		var fileFolderStat = {};
		var newFolder = {};
		var dirPath = process.env.PWD + appConfigs.articlesImagesPaths;
		while (folderExist) {
			foldername = crypto.randomBytes(20).toString('hex');
			folderpath = dirPath + foldername;
			fileFolderStat = await files.fileFolderStat(folderpath);
			if(!fileFolderStat.status){
				folderExist = false;
				folderpath = dirPath + foldername;
			}else{
				folderpath = '';
			}
		}
		if(!folderExist){
			newFolder = await files.createDir(folderpath);
			cb(null, newFolder.path);
		}
	},
	filename: (req, file, cb) => {
	  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
});

var articlesUploadsConfigs = multer({ storage: storagesArticles });
var articlesUploads = articlesUploadsConfigs.fields([{ name: 'articles', maxCount: 1 }]);

var storagesEvents = multer.diskStorage({
	destination: async (req, file, cb) => {

		var folderExist = true;
		var folderpath ='';
		var foldername = '';
		var fileFolderStat = {};
		var newFolder = {};
		var dirPath = process.env.PWD + appConfigs.eventsImagesPaths;
		while (folderExist) {
			foldername = crypto.randomBytes(20).toString('hex');
			folderpath = dirPath + foldername;
			fileFolderStat = await files.fileFolderStat(folderpath);
			if(!fileFolderStat.status){
				folderExist = false;
				folderpath = dirPath + foldername;
			}else{
				folderpath = '';
			}
		}
		if(!folderExist){
			newFolder = await files.createDir(folderpath);
			cb(null, newFolder.path);
		}
	},
	filename: (req, file, cb) => {
	  cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname))
	}
});

var eventsUploadsConfigs = multer({ storage: storagesEvents });
var eventsUploads = eventsUploadsConfigs.fields([{ name: 'events', maxCount: 1 }]);

module.exports = {  
	articlesUploads,
	eventsUploads
}