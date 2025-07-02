import mongoose from "mongoose";

// Function to connect to mongodb database

export const connectDB = async () => {
    try{

        mongoose.connection.on('connected', () => console.log("database connected."))

        await mongoose.connect(`${process.env.MONGODB_URI}/boomchat`)   //connect to database
    }catch(error){
        console.log(error);
    }
}