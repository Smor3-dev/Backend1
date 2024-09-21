import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['user', 'admin'], required: true },
    pets: { type: [String], default: [] },
    email: { type: String, unique: true, sparse: true } 
});


const User = mongoose.model('User', userSchema);
export default User; 
