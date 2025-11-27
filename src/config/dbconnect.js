import mongoose from "mongoose";

const url = "mongodb+srv://sourav:sourav@cluster0.cjfhqz5.mongodb.net/"

export async function dbConnect() {
    try {
        await mongoose.connect(url)
        console.log("Db is connected");
        
    } catch (error) {
        console.log("DB connection failed", error);
    }
}