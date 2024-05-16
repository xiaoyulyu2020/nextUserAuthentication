import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Please enter a username."],
        unique: true,
    },
    email: {
        type: String,
        required: [true, "Please enter a email."],
        unique: true,
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
    },
    isVerified: {
        type: Boolean,
        default: false,
    },
    isAdmin: {
        type: Boolean,
        default: false,
    },
    forgotPasswordToken: String,
    forgotPasswordTokenExpires: Date,
    verifyToken: String,
    verifyTokenExpires: Date,
})

const User = mongoose.models.users || mongoose.model("users", UserSchema);

export default User;