import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        model: String,
        mark: String,
        year: Number,
        color: String,
        available: String,
        price: Number,

    },
    {colletion: "cars"}
);

export default mongoose.model("Car", UserSchema);