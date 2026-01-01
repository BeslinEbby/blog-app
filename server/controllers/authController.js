const userModel = require("../models/authModel");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")


const registerUser = async (req, res) => {
   const { name, email, password } = req.body;

   if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please enter all fields" });
   }

   try {
      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
         return res.status(400).json({ success: false, message: "User already exists" });
      }

      const salt = 10;
      const hashedPassword = await bcrypt.hash(password, salt);

      const newUser = new userModel({
         name,
         email,
         password: hashedPassword,
      });

      const user = await newUser.save();
      if (user) {
         res.status(201).json({ success: true, message: "User registered successfully" });
      }
   } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
      console.log("error on register user : ", error);
   }
};

const loginUser = async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await userModel.findOne({ email });
      
      if (!user) {
         return res.status(400).json({ success: false, message: "User doesn't exists" });
      }

      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
         return res.status(400).json({sucees: false, message: "Invalid credentials" });
      }
      const token = jwt.sign({ id: user._id}, process.env.JWT_SECRET, {
         expiresIn: "24h",
      });   

      res.status(200).json({
         success: true,
         message: "logged in successfully",
         token,
         user: {
            _id: user._id,
            email: user.email,
            token
         },
      });
   } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
      console.log("error on login user : ", error);
   }
};

module.exports={
   registerUser,
   loginUser
}
