const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const Product = require('./models/Product');
const cartRoutes = require('./routes/cartRoutes');
const authRoutes = require('./routes/authRoutes');
const orderRoutes = require('./routes/orderRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Cart API
app.use('/cart', cartRoutes);
app.use('/auth', authRoutes);
app.use('/orders', orderRoutes);

// Product listing endpoint
app.get('/products', async (req, res) => {
  const products = await Product.find();
  res.json(products);
});

// MongoDB connection and sample data
const MONGO_URI = 'mongodb://localhost:27017/smartcart';
const PORT = 5000;

const SAMPLE_PRODUCTS = [
  // Electronics
  {id: 1, name: "Laptop", category: "Electronics", price: 1000},
  {id: 2, name: "Headphones", category: "Electronics", price: 150},
  {id: 3, name: "Smartphone", category: "Electronics", price: 800},
  {id: 4, name: "Tablet", category: "Electronics", price: 400},
  {id: 5, name: "Smartwatch", category: "Electronics", price: 200},
  {id: 6, name: "Bluetooth Speaker", category: "Electronics", price: 120},
  {id: 7, name: "Gaming Console", category: "Electronics", price: 500},
  {id: 8, name: "Wireless Mouse", category: "Electronics", price: 40},
  {id: 9, name: "Monitor", category: "Electronics", price: 250},
  {id: 10, name: "External Hard Drive", category: "Electronics", price: 90},
  {id: 31, name: "VR Headset", category: "Electronics", price: 350},
  {id: 32, name: "Drone", category: "Electronics", price: 600},
  {id: 33, name: "Action Camera", category: "Electronics", price: 180},
  {id: 34, name: "E-Reader", category: "Electronics", price: 130},
  {id: 35, name: "Portable Charger", category: "Electronics", price: 35},
  // Books
  {id: 11, name: "JavaScript Book", category: "Books", price: 20},
  {id: 12, name: "Novel", category: "Books", price: 15},
  {id: 13, name: "Python Programming", category: "Books", price: 25},
  {id: 14, name: "Science Fiction", category: "Books", price: 18},
  {id: 15, name: "Biography", category: "Books", price: 22},
  {id: 16, name: "History Book", category: "Books", price: 30},
  {id: 17, name: "Children's Book", category: "Books", price: 12},
  {id: 18, name: "Cookbook", category: "Books", price: 28},
  {id: 19, name: "Mystery Novel", category: "Books", price: 17},
  {id: 20, name: "Fantasy Book", category: "Books", price: 19},
  {id: 36, name: "Travel Guide", category: "Books", price: 24},
  {id: 37, name: "Self-Help Book", category: "Books", price: 21},
  {id: 38, name: "Comic Book", category: "Books", price: 14},
  {id: 39, name: "Art Book", category: "Books", price: 32},
  {id: 40, name: "Poetry Collection", category: "Books", price: 16},
  // Clothing
  {id: 21, name: "T-shirt", category: "Clothing", price: 25},
  {id: 22, name: "Jeans", category: "Clothing", price: 45},
  {id: 23, name: "Jacket", category: "Clothing", price: 80},
  {id: 24, name: "Sneakers", category: "Clothing", price: 60},
  {id: 25, name: "Dress", category: "Clothing", price: 70},
  {id: 26, name: "Sweater", category: "Clothing", price: 35},
  {id: 27, name: "Shorts", category: "Clothing", price: 20},
  {id: 28, name: "Socks", category: "Clothing", price: 10},
  {id: 29, name: "Hat", category: "Clothing", price: 15},
  {id: 30, name: "Scarf", category: "Clothing", price: 18},
  {id: 41, name: "Blazer", category: "Clothing", price: 90},
  {id: 42, name: "Boots", category: "Clothing", price: 75},
  {id: 43, name: "Cap", category: "Clothing", price: 12},
  {id: 44, name: "Belt", category: "Clothing", price: 22},
  {id: 45, name: "Gloves", category: "Clothing", price: 16},
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