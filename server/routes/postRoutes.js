const express=require("express")
const {createPost, updatePost} = require("../controllers/postController")
const protect = require("../middlewares/authMiddleware")
const upload = require("../middlewares/multer")

const postRouter=express.Router()

postRouter.post("/create", protect, upload.single("coverImage"), createPost)
postRouter.put("/update", protect, upload.single("coverImage"), updatePost)

module.exports=postRouter