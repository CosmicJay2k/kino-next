import { Schema, model, models } from "mongoose";

const userSchema = new Schema({
    name: String,
    phone: Number,
    email: String,
    password: String,
    token: String,
    isAdmin: Boolean,
    bookings: Array,
    registered: Date
});

const User = models.User || model("user", userSchema);
export default User;