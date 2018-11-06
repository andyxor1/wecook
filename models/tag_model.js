var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TagSchema = new Schema({
  title:   { type: String, required: true },
  recipes: { type: [Schema.Types.ObjectId] },
  type: {type: String, required: true }
});

module.exports = mongoose.model('Tag', TagSchema);
