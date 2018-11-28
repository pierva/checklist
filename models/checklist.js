const mongoose    = require("mongoose");
const Schema      = mongoose.Schema;
const Category    = require("./category");

const ChecklistSchema = new Schema({
  name: String,
  code: String,
  revision: Date,
  createdAt: {type: Date, default: Date.now},
  author: {
    id: {
      type: Schema.Types.ObjectId,
      ref: "User"
    },
    username: String
  },
  values: {}
});


module.exports = mongoose.model("Checklist", ChecklistSchema);
