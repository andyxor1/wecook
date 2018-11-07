var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StoreSchema = new Schema({
  name: {type: String }, 
  ingredients:   { type: [String] }
});

module.exports = mongoose.model('Store', StoreSchema);
