import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_CONNECTION_STRING);
        console.log('Lien ket thanh cong');;
    } catch (error) {
        console.log('Loi ket noi CSDL', error);
        process.exit(1);
    }
}