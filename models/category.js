const mongoose          = require("mongoose");
const Schema            = mongoose.Schema;
const Checklist         = require("./checklist");
const ChecklistSchema   = require("./checklist-schema");

const CategorySchema = new Schema({
  name: String,
  createdAt: {type: Date, default: Date.now},
  checklistsCompleted: [
    {
      type: Schema.Types.ObjectId,
      ref: "Checklist"
    }
  ],
  checklists: [ChecklistSchema]
});


CategorySchema.pre('remove', function(next){
  //this === category
  //the below const declaration will require the Category model
  //only when the middleware function is called. In this way we avoid
  //that if the Category model needs to require the user model, they keep
  //requiring each other without knowing which one has to be loaded first
  const Checklist = mongoose.model('Checklist');
  //the $in mongoose operator makes sure that when it goes through all the ids
  //of checklistsCompleted for the category we're removing and remove all of them from the
  //collection. The $in is called query operator
  //Basically is read as: Go through the Category model, check all the ids and if
  //the id is contained in the array checklistsCompleted of this category, remove the checklist document
  //from the database.
  //!!!!! NEVER ITERATE WITH A LOOP THROUGH THE DOCUMENTS IN THE DB. IT IS VERY UNEFFICIENT!!!!
  Checklist.deleteMany({ _id: { $in: this.checklistsCompleted}})
    .then(() => next());
});


module.exports = mongoose.model("Category", CategorySchema);
