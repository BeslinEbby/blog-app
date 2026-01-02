const express=require("express")
const {createPost, updatePost, deletePost, getAllPosts, getUserPosts} = require("../controllers/postController")
const protect = require("../middlewares/authMiddleware")
const upload = require("../middlewares/multer")

const postRouter=express.Router()

postRouter.post("/create", protect, upload.single("coverImage"), createPost)
postRouter.put("/update", protect, upload.single("coverImage"), updatePost)
postRouter.delete("/delete", protect, deletePost)
postRouter.get("/all", getAllPosts)
postRouter.get("/user", getUserPosts)

module.exports=postRouter