var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var RecipeSchema = new Schema({
  title:   { type: String, required: true },
  prep_time: { type: Number, min: 0, default: 0 },
  cook_time: { type: Number, min: 0, default: 0 },
  picture: { type: String },
  ingredients: { type: [String] },
  description: { type: [String] },
  instructions: { type: [String] },
  author: { type: String },
  author_name: { type: String },
  tags: { type: [String]},
  liked: {type: [Schema.Types.ObjectId], ref: "User"},
  likes: { type: Number, default:0 }

});


module.exports = mongoose.model('Recipe', RecipeSchema);
