import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"
import authSchema from "../model/authSchema.js"

const SECRET_KEY = "secrete_key"

export const signupController = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: "Fields are required" })
    }

    const userExist = await authSchema.findOne({ username })
    if (userExist) {
      return res.status(409).json({ message: "User already exists" })
    }

    const hashed = await bcrypt.hash(password, 10)

    const userData = new authSchema({
      username,
      password: hashed,
    })

    await userData.save()

    res.status(201).json({ message: "Signup successfully" })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}

export const loginController = async (req, res) => {
  try {
    const { username, password } = req.body

    if (!username || !password) {
      return res.status(400).json({ message: "Fields are required" })
    }

    const userExist = await authSchema.findOne({ username })
    if (!userExist) {
      return res.status(404).json({ message: "User not exists" })
    }

    const isMatch = await bcrypt.compare(password, userExist.password)
    if (!isMatch) {
      return res.status(401).json({ message: "Password not matched" })
    }

    const token = jwt.sign(
      { id: userExist._id, username },
      SECRET_KEY,
      { expiresIn: "1h" }
    )

    res.status(200).json({
      message: "Login successfully",
      token,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: "Server error" })
  }
}


export const authentication = async(req, res, next) => {
    try {
        const authHeaders = req.headers.authorization
        // Check header
    if (!authHeaders) {
      return res.status(401).json({ message: "No token provided" });
    }
        const token = authHeaders && authHeaders.split(" ")[1]
        
        jwt.verify(token, SECRET_KEY, (error, decoded)=>{
           if (error) {
        return res.status(403).json({ message: "Invalid token" });
      }

            req.user = decoded
            next()
        })
    } catch (error) { 
        console.error(error)
    }
}

export const protectedController = async(req, res)=>{
    try {
        res.status(200).json({message: req.user.username})
    } catch (error) {
        console.error(error)
         res.status(500).json({ message: "Server error" });
    }
}

export const getController = async(req, res)=>{
    try {
        const authAuth = await authSchema.find()
        res.status(200).json({message:"get data", authAuth})
    } catch (error) {
        console.error(error)
    }
}