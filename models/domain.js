const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create Domain Schema
const domainSchema = new Schema({
  name: String,
  description: String,
  image: String
},
{
  versionKey: false
});

module.exports = Domain = mongoose.model('domain', domainSchema);