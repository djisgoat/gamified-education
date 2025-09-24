import mongoose from "mongoose";

const connectdb = async () => {
  try {
    const uri =
      process.env.NODE_ENV === "production"
        ? process.env.MONGODBURI
        : process.env.MONGODB_LOCAL;

    console.log("Connecting to MongoDB URI:", uri);

    if (!uri) {
      throw new Error("MongoDB URI is not defined");
    }

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`MongoDB connected: ${uri.includes("localhost") ? "Local" : "Atlas"}`);
  } catch (error) {
    console.error("Database connection error:", error);
    process.exit(1);
  }
};

export default connectdb;
