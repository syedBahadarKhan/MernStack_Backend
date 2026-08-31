import express from "express"

import dotenv from "dotenv"

import mongoose from "mongoose"

import route from "./Routes/userRoute.js"

import cors from "cors"

dotenv.config();

const app = express();

app.use(express.json());

app.use(cors())

app.use("/api", route)

const PORT = process.env.PORT;

const MONGOURL = process.env.MongoDB_URL;

mongoose.connect(MONGOURL)

       .then(() =>{

            console.log("Db connected Succefully")

            app.listen(PORT, () =>{

                 console.log(`server is runing :${PORT}`);

            })

        })

     .catch((error) => {

        console.log("MongoDB Error:", error);

    });