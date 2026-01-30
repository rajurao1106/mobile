import mongoose from "mongoose";

const authShema = new mongoose.Schema({
    username: {type:String},
    password: {type:String}
})

export default mongoose.model("authentication", authShema)