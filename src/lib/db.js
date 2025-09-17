import mongoose from 'mongoose';

const uri = process.env.MONGODB_URI || 'mongodb+srv://hr2129:hr2129@cluster0.iq9mbzl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';

const connectDB = async () => {
  if (mongoose.connections[0].readyState) return;
  try {
    await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    throw new Error('Failed to connect to MongoDB');
  }
};

const RestaurantSchema = new mongoose.Schema({
  id: Number,
  name: String,
  location: String,
  cuisine: String,
});
export const Restaurant = mongoose.model('Restaurant', RestaurantSchema);

const OrderSchema = new mongoose.Schema({
  id: Number,
  restaurant_id: Number,
  order_amount: Number,
  order_time: Date,
});
export const Order = mongoose.model('Order', OrderSchema);

export default connectDB;