import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI+"/urlshort" || 'mongodb://localhost:27017/urlshort', {
    });
    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error:any) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB;
