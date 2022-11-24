import mongoose from 'mongoose';



const connectDB = async () =>{
    try {
        mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser:true,
        });
        console.log("Database connected");
    } catch (err) {
        process.exit(1);
    }
}

export default connectDB;