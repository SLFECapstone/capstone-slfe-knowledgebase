const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const systemEvenSchema = new Schema({
  created_on: { type: Date, default: Date.now() },
  created_by: { type: String, required: true },
  subject: { type: String, required: true },
  event_type: { type: String, required: true },
  visibility: { type: String, required: true },
  changed_on: { type: Date },
  role: { type: String },
  handled_by: { type: String },
  result: { type: String },
  display: { type: String }
},
{
  versionKey: false
});

module.exports = SystemEvent = mongoose.model('system_event', systemEvenSchema);
