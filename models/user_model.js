var mongoose = require("mongoose");
var passportLocalMongoose = require("passport-local-mongoose");
var Schema = mongoose.Schema;

var UserSchema = new mongoose.Schema({
  UserId:   { type: Schema.Types.ObjectId },
  username: { type: String, unique: true },
  password: { type: String },
  email   : { type: String },
  role:     { type: String }
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
