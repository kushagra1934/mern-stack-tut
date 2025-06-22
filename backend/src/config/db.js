import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MOngoDB connected successfully");
  } catch (error) {
    console.log("MongoDB connection failed", error);
    process.exit(1); //exit with failure
  }
};
