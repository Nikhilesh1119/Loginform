import mongoose from "mongoose";
import 'dotenv/config';
export async function dbConfig(){
    try {
    mongoose.set('strictQuery',true);
    await mongoose.connect(process.env.DBURL);
    console.log("Database connected!");
    } catch (error) {
        console.log(error);
    }
}