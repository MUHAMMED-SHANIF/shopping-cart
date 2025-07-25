const mongoose = require('mongoose');
const Product = require('../models/Product');

const products = [
  { id: 1, name: 'Laptop', category: 'Electronics', price: 1000 },
  { id: 2, name: 'Smartphone', category: 'Electronics', price: 600 },
  { id: 3, name: 'Novel', category: 'Books', price: 20 },
  { id: 4, name: 'T-Shirt', category: 'Clothing', price: 25 },
  { id: 5, name: 'Jeans', category: 'Clothing', price: 50 }
];

async function insertProducts() {
  await mongoose.connect('mongodb://localhost:27017/ecommers');
  await Product.deleteMany({}); // Clear existing products
  await Product.insertMany(products);
  console.log('Test products inserted!');
  await mongoose.disconnect();
}

insertProducts().catch(err => {
  console.error(err);
  process.exit(1);
}); 