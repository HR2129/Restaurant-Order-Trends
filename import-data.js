const fs = require('fs');
const mongoose = require('mongoose');

async function importData() {
  try {
    const uri = process.env.MONGODB_URI || 'mongodb+srv://hr2129:hr2129@cluster0.iq9mbzl.mongodb.net/restaurant_analytics?retryWrites=true&w=majority';
    await mongoose.connect(uri);
    console.log('Connected to MongoDB Atlas');

    const RestaurantSchema = new mongoose.Schema({ id: Number, name: String, location: String, cuisine: String });
    const OrderSchema = new mongoose.Schema({ id: Number, restaurant_id: Number, order_amount: Number, order_time: Date });
    const Restaurant = mongoose.model('Restaurant', RestaurantSchema);
    const Order = mongoose.model('Order', OrderSchema);

    const restaurants = JSON.parse(fs.readFileSync('./restaurants.json', 'utf-8'));
    const orders = JSON.parse(fs.readFileSync('./orders.json', 'utf-8'));

    await Restaurant.deleteMany({});
    console.log('Cleared restaurants collection');
    await Order.deleteMany({});
    console.log('Cleared orders collection');

    await Restaurant.insertMany(restaurants);
    console.log('Imported restaurants');
    await Order.insertMany(orders.map(o => ({ ...o, order_time: new Date(o.order_time) })));
    console.log('Imported orders');

    console.log('Data import completed');
  } catch (error) {
    console.error('Import error:', error);
  } finally {
    await mongoose.connection.close();
    console.log('MongoDB connection closed');
    process.exit();
  }
}

importData();