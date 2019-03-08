
const fs = require('fs');
const _ = require('lodash');
var events = require('./start/Events.json');
var articles = require('./start/Articles.json');
var Promise = require('bluebird');
var mongoose = require('bluebird').promisifyAll(require('mongoose'));
mongoose = require('../../configs/nosql.config');
var Events = require('../../models/Events.js');
var Articles = require('../../models/Articles.js');
var Categories = require('../../models/Categories');


var renameKeys = async (obj, newKeys) => {
    const keyValues = Object.keys(obj).map(key => {
      const newKey = newKeys[key] || key;
      return { [newKey]: obj[key] };
    });
    return Promise.resolve(Object.assign({}, ...keyValues));
};

var changeFolderToString = async (arrObj) => {
    try{
        for(let i = 0; i< arrObj.length; i++){
            arrObj[i].folder = arrObj[i].folder.toString();
        }
        return Promise.resolve(arrObj);
    } catch(err) {
        return Promise.reject('Error converting string');
    }       
}

var removeDates = async (arrObj) => {
    try{
        for(let i = 0; i< arrObj.length; i++){
            arrObj[i].date = '';
            arrObj[i].enddate = '';
        }
        return Promise.resolve(arrObj);
    } catch(err) {
        return Promise.reject('Error changing date');
    }       
}

var writeToFile = async (arrObj, outputPath) => {
    fs.writeFileSync(outputPath, JSON.stringify(arrObj, null, 4));
    return{ message: 'JSON write completed' }
}

var writeToDb = async (arrObjPath, model, chunk) => {
    try{
        var arrObj = require(arrObjPath);
        var newData = [];
        var tempNewData = [];
        var temparray = [];
        for (let i=0, j=arrObj.length; i<j; i+=chunk) {
            temparray = arrObj.slice(i,i+chunk);
            tempNewData = await model.create(temparray);
            newData = _.unionBy(tempNewData, newData);
        }     
        return Promise.resolve(newData);
    } catch(err) {
        console.log('err: ', err);
        return Promise.reject('Error creating db');
    }       
}

var setupEvents = async (events, outputPath) => {
    try{
        const newKeys = { 
            eid: "folder",
            etype: "type",
            eventname: "name",
            eventdatetime: "date",
            eventenddatetime: "enddate",
            eventplace: "place",
            eventdetails: "details",
            estatus: "status"
        };
        var updatedEvents = [];
        for(let i = 0; i< events.length; i++){
            updatedEvents[i] = await renameKeys(events[i], newKeys);
        }
        updatedEvents = await changeFolderToString(updatedEvents);
        updatedEvents = await removeDates(updatedEvents);
        var writeFileStatus = writeToFile(updatedEvents, outputPath);
        if(updatedEvents){
            var dbWrite = await writeToDb(outputPath, Events, 5)
            if(dbWrite){
                return Promise.resolve({
                    outputPath: outputPath,
                    status: true,
                    message: 'Successfully created Events'
                });
            }
        } else {
            return Promise.resolve({
                outputPath: outputPath,
                status: false,
                message: 'Error setting up Events'
            });
        }
    } catch(err) {
        console.log(err);
    }       
}

var setupArticles = async (articles, outputPath) => {
    try{
        var oldcategories = require("./start/Categories.json");
        var newcategories = await Categories.find();
        var categoriesRefs = {
            "1": "5bbb44de450a9b398b1ca671",
            "3": "5bbb44de450a9b398b1ca673",
            "4": "5bbb44de450a9b398b1ca674",
            "5": "5bbb44de450a9b398b1ca675",
            "16": "5bbb44de450a9b398b1ca676",
            "17": "5bbb44de450a9b398b1ca677",
            "18": "5bbb44de450a9b398b1ca678",
            "19": "5bbb44de450a9b398b1ca679",
            "20": "5bbb44de450a9b398b1ca67a",
            "21": "5bbb44de450a9b398b1ca67b",
            "22": "5bbb44de450a9b398b1ca67d",
            "23": "5bbb44de450a9b398b1ca67c",
            "25": "5bbb44de450a9b398b1ca672",
            "27": "5c48167d4b595e7a68c729a3"
        };
        const newKeys = { 
            aid: "folder",
            cid: "categories",
            imgtext: "imagetext",
            astatus: "status",
            article: "contents"
        };
        var updatedArticles = [];
        for(let i = 0; i< articles.length; i++){
            updatedArticles[i] = await renameKeys(articles[i], newKeys);
            delete updatedArticles[i].date;
        }
        updatedArticles = await changeFolderToString(updatedArticles);
        for(let i = 0; i< updatedArticles.length; i++){
            _.forEach(categoriesRefs, function(value, key) {
                if(updatedArticles[i].categories == key){
                    updatedArticles[i].categories = value;
                }
            });
        }
        var writeFileStatus = writeToFile(updatedArticles, outputPath);

        if(updatedArticles){
            var dbWrite = await writeToDb(outputPath, Articles, 5);
            if(dbWrite){
                return Promise.resolve({
                    outputPath: outputPath,
                    status: true,
                    message: 'Successfully created Articles'
                });
            }
        } else {
            return Promise.resolve({
                outputPath: outputPath,
                status: false,
                message: 'Error setting up Articles'
            });
        }
    } catch(err) {
        console.log(err);
    }       
}

// var setupCategories = async () => {
//     let categoriesRef = [];
//     let tempCategoriesRef = {};
//     let categories = await Categories
//     .find();
//     let oldcategories = require("./start/Categories.json");
//     for(let i=0; i<categories.length; i++){

//     }
// }

// setupCategories().then(rsp => {

// });

// setupEvents(events, './end/Events.json').then(rsp => {
//     console.log('rsp: ', rsp);
// });

// setupArticles(articles, './end/Articles.json').then(rsp => {
//     console.log('rsp: ', rsp);
// });