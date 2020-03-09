import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';


const UserSchema = mongoose.Schema({
    email: String,
    name: String,
    password: {
        type: String,
        set: p => bcrypt.hashSync(p, 12)
    },
}, {
    timestamps: true,
});


const User = mongoose.model('User', UserSchema);

export default User;