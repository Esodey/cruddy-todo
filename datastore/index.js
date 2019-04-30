const fs = require('fs');
const path = require('path');
const _ = require('underscore');
const counter = require('./counter');

var items = {};

// Public API - Fix these CRUD functions ///////////////////////////////////////

exports.create = (text, callback) => {
  counter.getNextUniqueId((err, id) => {
    if (err) {
      throw ('error getting unique id');
    } else {
      fs.writeFile(path.join(id, `${text}.txt`), text, (err) => { // need to ensure 
        if (err) {
          throw ('error writing file');
        } else {
          callback;
        }
      });
    }
  });
  /////////////////
  // var id = counter.getNextUniqueId();
  // items[id] = text;
  // callback(null, { id, text });
};
/*
exports.create should save every todo in its own file
invoke getNextUniqueId to generate a file path for the 
*/

exports.readAll = (callback) => {
  var data = _.map(items, (text, id) => {
    return { id, text };
  });
  callback(null, data);
};
// should retrieve all the contents of all stored todo list files

exports.readOne = (id, callback) => {
  var text = items[id];
  if (!text) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback(null, { id, text });
  }
};
// should retrieve the contents of one todo list file

exports.update = (id, text, callback) => {
  var item = items[id];
  if (!item) {
    callback(new Error(`No item with id: ${id}`));
  } else {
    items[id] = text;
    callback(null, { id, text });
  }
};
// should be able to update the contents or status of a particular todo list file

exports.delete = (id, callback) => {
  var item = items[id];
  delete items[id];
  if (!item) {
    // report an error if item not found
    callback(new Error(`No item with id: ${id}`));
  } else {
    callback();
  }
};
// should delete a specific todo list file

// Config+Initialization code -- DO NOT MODIFY /////////////////////////////////

exports.dataDir = path.join(__dirname, 'data');

exports.initialize = () => {
  if (!fs.existsSync(exports.dataDir)) {
    fs.mkdirSync(exports.dataDir);
  }
};
