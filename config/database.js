import mongoose from "mongoose";

let connected = false;

const connectDB = async() => {
    mongoose.set('strictQuery', true); // if we don't do that then we're just going to get a warning message
    // mongoose.set('strictQuery', true) ensures that only fields that are specified in our schema will be saved to the database

    // If database is already connected, don't connect again
    if (connected) {
        console.log("MongoDB already connected");
        return;
    } 

    // Connect to MongoDB
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);   
        connected = true;

        console.log(`MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.log(`Error connecting mongodb: ${error}`)
        process.exit(1);
    }
}

export default connectDB;