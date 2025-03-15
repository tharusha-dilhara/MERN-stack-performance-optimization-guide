const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: String,
  description: String
});
itemSchema.index({ name: 1 });  // Create an index on the 'name' field
module.exports = mongoose.model('Item', itemSchema);
