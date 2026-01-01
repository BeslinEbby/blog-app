const express=require("express")
const createPost = require("../controllers/postController")
const protect = require("../middlewares/authMiddleware")

const postRouter=express.Router()

postRouter.post("/create", protect, upload.single("coverImage"), createPost)

module.exports=postRouter