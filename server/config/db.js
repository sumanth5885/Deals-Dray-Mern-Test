import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://sumanthspoojary58:lkiHsfwuJAzC6B9v@cluster0.lgbxmig.mongodb.net/mern-test').then(() => {
        console.log("DB Connected")
    })
}