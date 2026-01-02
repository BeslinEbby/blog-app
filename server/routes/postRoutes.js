const express = require("express");
const {
   createPost,
   updatePost,
   deletePost,
   getAllPosts,
   getUserPosts,
   getSinglePost,
   updatePostLikes,
} = require("../controllers/postController");
const protect = require("../middlewares/authMiddleware");
const upload = require("../middlewares/multer");

const postRouter = express.Router();

postRouter.post("/create", protect, upload.single("coverImage"), createPost);
postRouter.put("/update/:postId", protect, upload.single("coverImage"), updatePost);
postRouter.put("/like/:postId", protect, updatePostLikes);
postRouter.delete("/delete/:postId", protect, deletePost);
postRouter.get("/all", getAllPosts);
postRouter.get("/user", protect, getUserPosts);
postRouter.get("/post/:postId", getSinglePost);

module.exports = postRouter;
