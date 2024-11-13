import mongoose from 'mongoose'

let isConnected: boolean = false;

export const connectToDatabase = async () => {
    mongoose.set('strictQuery', true);

    if (!process.env.MONGODB_URL) {
        return console.log('MISSING MONGODB_URL')
    }
    if (isConnected) {
        return console.log('MONGO Connected to MONGODB');
    }
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            dbName: 'TASK MANAGER'
        })
        isConnected = true
    } catch (err) {
        console.log(err)
    }
}
