import mongoose from "mongoose";

export async function connect() {
    try {
        mongoose.connect(process.env.MONGO_URI!);
        const connection = await mongoose.connection;

        connection.on("connected", async () => {
            console.log("Connected to MongoDB");
        })

        connection.on("error", (err) => {
            console.log("Error connecting to MongoDB");
            console.log(err);
        })
    } catch (error) {
        console.log("MongoDB connection error:");
        console.log(error);
    }
}