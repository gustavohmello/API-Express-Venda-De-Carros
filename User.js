import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        Name: String,
        Email: String,
        Number: Number,
        Password: (String, Number),
        Age: Number,

    },
    { collection: "user" }
);

export default mongoose.model("User", UserSchema);