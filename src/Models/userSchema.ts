import mongoose from 'mongoose'
const userSchema = new mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    phoneNumber: Number,
    is_admin: {
        type: Boolean,
        default: false
    },
    create_at: {
        type: Date,
        default: Date.now
    },
    updated_at: Date,
})


export default mongoose.model("Users", userSchema)