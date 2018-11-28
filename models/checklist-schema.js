const mongoose    = require("mongoose");

const ChecklistListSchema = new mongoose.Schema({
  name: String,
  code: String,
  revision: Date
});

module.exports = ChecklistListSchema;
