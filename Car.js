import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        model: String,
        mark: String,
        year: Number,
        color: String,
        available: Boolean,
        price: Number,
        plate: String,

    },
    {colletion: "Car"}
);

export default mongoose.model("Car", UserSchema);