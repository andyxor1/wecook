var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var Schema = mongoose.Schema;
var Recipe = require("./recipe_model");

var UserSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  password: { type: String },
  email   : { type: String },
  recipes_owned: {type: [Schema.Types.ObjectId], ref: "Recipe"},
  recipes_liked: {type: [String] }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
