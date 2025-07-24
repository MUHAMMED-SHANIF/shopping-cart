const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Product = require('./models/Product');
const cartRoutes = require('./routes/cartRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Cart API
app.use('/cart', cartRoutes);

// Product listing endpoint
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// MongoDB connection and sample data
const MONGO_URI = 'mongodb://localhost:27017/smartcart';
const PORT = 5000;

const SAMPLE_PRODUCTS = [
  {id: 1, name: "Laptop", category: "Electronics", price: 1000},
  {id: 2, name: "JavaScript Book", category: "Books", price: 20},
  {id: 3, name: "T-shirt", category: "Clothing", price: 25},
  {id: 4, name: "Headphones", category: "Electronics", price: 150},
  {id: 5, name: "Novel", category: "Books", price: 15}
];

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(async () => {
    console.log('MongoDB connected');
    // Seed products if not present
    const count = await Product.countDocuments();
    if (count === 0) {
      await Product.insertMany(SAMPLE_PRODUCTS);
      console.log('Sample products seeded');
    }
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch(err => console.error(err)); 