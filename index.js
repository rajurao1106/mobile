import express from "express"
import cors from "cors"
import { connectDB } from "./config/connectDB.js"
import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"

const app = express()
const port = 1337

app.use(express.json())
app.use(cors({
  origin: "*",
}));

connectDB()

app.use("/auth", authRoutes)
app.use("/dashboard", productRoutes)

app.listen(port, console.log("HELLO I AM SERVER"))