var fs = require('fs-extra')
var Promise = require("bluebird");
var path = require('path');
var _ = require('lodash');
var checkExt = RegExp('^.*\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF|doc|DOC|pdf|PDF)$');

// check if directory exist
const fileFolderStat = filepath => {
    return new Promise((resolve, reject) => {
      try {
        fs.stat(filepath, (error, stats) => {
          if (!error) {
            var props = { folder: stats.isDirectory(), file: stats.isFile() }
            return resolve({ 'path': filepath, 'status': true, 'message': 'file exist', 'props': props});
          }
          if (error && error.code === 'ENOENT') {
            return resolve({ 'path': filepath, 'status': false, 'message': 'file not exist' });
          }
        });
      } catch (err) {
        reject(err);
      }
    });
};

// create new directory
var createDir = async (pathToCreate) => {
  return new Promise((resolve, reject) => {
    fs.mkdir(pathToCreate, function (err) {
        if (err) return reject(err);
        return resolve({path: pathToCreate, status: true});
    });
  });
}

var removeFile = async (pathToDelete) => {
  return new Promise((resolve, reject) => {
    fs.remove(pathToDelete, (err) => {
      if (err) throw err;
      return resolve({path: pathToDelete, status: true});
    });
  });
}

module.exports = {
    fileFolderStat,
    createDir,
    removeFile
}