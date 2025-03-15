const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const redis = require('redis');

const app = express();
app.use(cors());
app.use(express.json());

// test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

// MongoDB connection URI (replace with your online MongoDB URI)
const mongoURI = process.env.MONGO_URI || 'mongodb+srv://slbasha5555:0dtBv6tvnVrRRQGY@cluster0.ozxk2.mongodb.net/search_project';

mongoose.connect(mongoURI);

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
    console.log('Connected to MongoDB');
});


// Import routes
const itemRoutes = require('./routes/itemRoutes');
app.use('/api/items', itemRoutes);




const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
