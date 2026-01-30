import express from "express"
import { deleteProduct, getProduct, sendProduct, updateProduct } from "../controllers/productControllers.js"


const productRoutes  = express.Router()

productRoutes.post("/send", sendProduct)
productRoutes.get("/get", getProduct)
productRoutes.put("/update/:id", updateProduct);
productRoutes.delete("/delete/:id", deleteProduct);

export default productRoutes