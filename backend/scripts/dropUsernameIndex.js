const mongoose = require('mongoose');

async function dropUsernameIndex() {
  await mongoose.connect('mongodb://localhost:27017/ecommers');
  try {
    await mongoose.connection.db.collection('users').dropIndex('username_1');
    console.log('Dropped index username_1');
  } catch (err) {
    console.log('Index username_1 does not exist or already dropped.');
  }
  await mongoose.disconnect();
}

dropUsernameIndex(); 