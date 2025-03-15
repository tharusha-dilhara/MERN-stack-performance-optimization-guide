const Item = require('../models/item');
const redis = require('redis');

// Setup Redis client
const redisClient = redis.createClient({
  url: process.env.REDIS_URL || 'redis://redis:6379'
});

redisClient.connect()
  .then(() => console.log('Connected to Redis'))
  .catch(console.error);

// Utility function to clear search cache
const clearSearchCache = async () => {
  try {
    // Get all keys that start with "search:"
    const keys = await redisClient.keys('search:*');
    if (keys.length > 0) {
      await redisClient.del(keys);
    }
  } catch (err) {
    console.error('Error clearing cache:', err);
  }
};

// Controller function to handle search requests with caching
exports.searchItems = async (req, res) => {
  try {
    const query = req.query.q || '';
    const cacheKey = `search:${query}`;

    // Check Redis cache for the search results
    const cachedResults = await redisClient.get(cacheKey);
    if (cachedResults) {
      return res.json(JSON.parse(cachedResults));
    }

    // Perform database search if cache miss
    const results = await Item.find({ name: { $regex: query, $options: 'i' } }).lean();
    
    // Cache the results for 60 seconds
    await redisClient.setEx(cacheKey, 60, JSON.stringify(results));
    res.json(results);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Controller function to handle update requests and clear cache accordingly
exports.updateItems = async (req, res) => {
  try {
    const itemId = req.params.id;
    const updateData = req.body; // Expects { name: '...', description: '...' }
    const updatedItem = await Item.findByIdAndUpdate(itemId, updateData, { new: true });
    
    if (!updatedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Invalidate any cached search results
    await clearSearchCache();

    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};

// Controller function to handle delete requests and clear cache accordingly
exports.deleteItems = async (req, res) => {
  try {
    const itemId = req.params.id;
    const deletedItem = await Item.findByIdAndDelete(itemId);
    
    if (!deletedItem) {
      return res.status(404).json({ message: 'Item not found' });
    }

    // Invalidate any cached search results
    await clearSearchCache();

    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
};
