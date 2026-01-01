const express= require("express");
const {registerUser, loginUser, userProfile} = require("../controllers/authController");
const protect = require("../middlewares/authMiddleware");

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/profile", protect, userProfile);


module.exports=userRouter;