import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL!);
    const connection = mongoose.connection;

    connection.on('connected', () => {
      console.log('MongoDB connected');
    })
    
    connection.on('error', (err) => {
      console.log('MongoDB connection error: ', err);
      process.exit();
    })
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

export default connectDB;
