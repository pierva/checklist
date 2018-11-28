const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const Schema = mongoose.Schema;


const UserSchema = new mongoose.Schema({
  username: String,
  password: String,
  isAdmin: {type: Boolean, default: false},
  category: [{
    type: Schema.Types.ObjectId,
    ref: 'Category'
  }]
});

UserSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("User", UserSchema);
