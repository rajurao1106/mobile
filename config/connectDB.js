import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()
 
export const connectDB = async() => {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("HELLO I AM DATABASE") 
    } catch (error) {
        console.error(error)
    } 
}