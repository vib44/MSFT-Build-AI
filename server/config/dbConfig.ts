import mongoose from "mongoose";

const connectDb= async(): Promise<void> =>
{
    try {
        await mongoose.connect(process.env.MONGODB_URL as string);
        console.log("Connected to Db");
    } catch (error) {
        console.log("Error in DB connection");
        //process.exit(1);
    }
}

export default connectDb;