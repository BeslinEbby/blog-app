const userModel = require("../models/authModel");

const registerUser = async (req, res) => {
   const { name, email, password } = req.body;

   if (!name || !email || !password) {
      return res.status(400).json({ success: false, message: "Please enter all fields" });
   }

   try {
      const existingUser = await userModel.findOne({ email });

      if (existingUser) {
         return res.status(400).json({ success: false, message: "user already exists" });
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
         res.status(201).json({ success: true, message: "user registered successfully" });
      }
   } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
      console.log("error on register user : ", error);
   }
};

module.exports=registerUser
