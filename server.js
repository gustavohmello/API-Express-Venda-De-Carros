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

    } catch (ERROR) {
        console.log("ERRO: ", ERROR);

    }
}

connectDB();

app.post("/Car", async (req, res) => {
    try {
        const newCar = await Car.create(req.body);
        res.json(newCar);
    } catch (ERROR) {
        res.json({ ERROR: ERROR.mensage });

    }
})

app.get("/Car", async (req, res) => {
    try {
        const Cars = await Car.find();
        res.json(Cars);
    } catch (ERROR) {
        res.json({ ERROR: ERROR.mensage })
    }

})

app.get("/Car/:id", async (req, res) => {
    try {
        const Cars = await Car.findById(req.params.id);
        res.json(Cars)
    } catch (ERROR) {
        res.json({ ERRPR: ERROR.mensage })
    }
})

app.put("/Car/:id", async (req, res) => {
    try {
        const updateCar = await Car.findByIdAndUpdate(
            req.params.id,
            req.body
        );
        res.json(updateCar);
    } catch (ERROR) {
        res.json({ ERROR: ERROR.mensage })
    }
})

app.delete("/Car/:id", async (req, res) => {
    try {
        const deletedCar = await Car.findByIdAndDelete(req.params.id);
        res.json(deletedCar);

    } catch (ERROR) {
        res.json({ ERROR: ERROR.mensage });
    }

})

app.get("/Car/mark/:mark", async (req, res) => {
    try {
        const markByCar = await Car.findOne({ mark: req.params.mark });
        res.json({ markByCar });
    } catch (ERROR) {
        res.json({ ERROR: ERROR.mensage });
    }
})

app.get("/Car/available/:available", async (req, res) => {
    try {
        const searchForAvailableCars = await Car.find({available: true});
        res.json({ searchForAvailableCars });
    } catch (ERROR) {
        res.json({ ERROR: ERROR.mensage });
    }
})

app.patch("/Car/:id/availability", async (req, res) => {
    try {
        const updateAvailable = await Car.findByIdAndUpdate(
            req.params.id,
            { available: req.body.available  },
            { new: true }
        )
        res.json(updateAvailable);
    } catch (ERROR) {
        res.json({ ERROR: ERROR.mensage });
    }

})

app.get("/Car/price/:min/:max", async (req, res) => {
    try {
        const carSearchPlate = await Car.find({ price: { $gte: Number(req.params.min), $lte: Number(req.params.max) } });
        res.json(carSearchPlate);
    } catch (ERROR) {
        res.json({ ERROR: ERROR.mensage });

    }

})

app.get("/car/plate/:plate", async (req, res) => {
    try {
        const carplate = await Car.findOne({ plate: req.params.plate })
        res.json({ carplate })
    } catch (error) {
        res.json({ error: error.message })
    }
})

app.get("/Car/available/count", async (req, res) => {
    try {

        const carCount = await Car.countDocumentos({ available: true })
        res.json(carCount);
    } catch (ERROR) {
        res.json({ ERROR: ERROR.mensage });

    }

})





app.listen(PORT, () =>
    console.log("o servidor está rodando na porta", PORT)
)