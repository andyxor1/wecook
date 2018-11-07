var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
  title:   { type: String, required: true },
  type: {type: String, required: true },
  recipes: { type: [Schema.Types.ObjectId] }

});

module.exports = mongoose.model('Tag', TagSchema);
