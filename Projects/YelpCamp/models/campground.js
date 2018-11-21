var mongoose = require('mongoose');

//  SETUP SCHEMA
var campgroundSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  comments: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "Comment"
  }]
});

//  Create a model using the campgroundSchema
module.exports = mongoose.model("Compground", campgroundSchema);
