const Item = require('../models/item');

// Controller function to handle search requests
exports.searchItems = async (req, res) => {
  try {
    const query = req.query.q || '';
    // Basic regex search (can be slow on large datasets)
    const results = await Item.find({ name: { $regex: query, $options: 'i' } }).lean();
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Controller function to handle update requests
exports.updateItems = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updateData = req.body; // Expects { name: '...', description: '...' }
    const updatedItem = await Item.findByIdAndUpdate(itemId, updateData, { new: true });
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};


// Controller function to handle delete requests
exports.deleteItems = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await Item.findByIdAndDelete(_id = itemId);
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
