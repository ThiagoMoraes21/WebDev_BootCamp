let mongoose = require('mongoose');

//  Blog mondel
var blogSchema = new mongoose.Schema({
  title: String,
  subTitle: String,
  image: String,
  body: String,
  created: {type: Date, default: Date.now}
});

module.exports = mongoose.model("Blog", blogSchema);
