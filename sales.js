import mongoose from "mongoose"

const UserSchema = new mongoose.Schema(
    {
        id: String,
        idDoUsuario: String,
        idDoCarro: String ,
        ValordaVenda: Number,
        FormaDePagamento: String,
        DataDaVenda: Number,
        status: String,

    },
    { collection: "sales" }
);

export default mongoose.model("Sale", UserSchema);

