import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import Car from "./Car.js";

dotenv.config();

const app = express();
const PORT = 4200;

app.use(express.json());

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("conectado com o MONGODB")

    }catch (ERROR){
        console.log("ERRO: ",ERROR);

    }
} 

connectDB();

app.post("/Car", async (req, res) => {
    try{
        const newCar = await Car.create(req.body);
        res.json(newCar);
    }catch (ERROR){
        res.json({ERROR: ERROR.mensage });

    }
})

app.get("/Car", async (req, res) => {
    try{
        const Cars = await Car.find();
        res.json(Cars);   
    }catch (ERROR) {
        res.json( {ERROR: ERROR.mensage})
    }
   
})

app.get("/Car/:id", async (req, res) => {
    try{
        const Cars = await Car.findById(req.params.id);
        res.json(Cars)
    }catch (ERROR){
        res.json( {ERRPR: ERROR.mensage})
    }
})

app.put("/Car/:id", async (req, res) => {
    try{
        const updateCar = await Car.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.json(updateCar);
    }catch (ERROR){
        res.json( {ERROR: ERROR.mensage} )
    }
})

app.delete("/Car/:id", async (req, res) => {
    try{
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        res.json(deletedCar);

        }catch(ERROR){
        res.json({ERROR: ERROR.mensage});
    }

})

app.get("/Car/mark/:mark", async (req, res) => {
    try{
        const markByCar = await Car.findOne( {mark: req.params.mark} );
        res.json( {markByCar} );
    }catch (ERROR) {
        res.json( {ERROR: ERROR.mensage});
    }
})






app.listen(PORT, () => 
console.log("o servidor está rodando na porta", PORT)
)