import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        mongoose.set('strictQuery', false);
        await mongoose.connect(process.env.URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('MongoDB is Connected');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};


