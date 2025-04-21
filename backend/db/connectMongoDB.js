import  mongoose  from 'mongoose';


const connectDB = async(req, res) =>{
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`Database connection was successful ${conn.connection.host}`)
    } catch (error) {
        console.log(`Error connecting to mongoDB ${error.message}`)
        process.exit(1)
    }
}

export default connectDB;
