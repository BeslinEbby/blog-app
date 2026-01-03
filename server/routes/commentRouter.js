const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { addComment, deleteComment, updateComment, allCommentsByPost } =require("../controllers/commentController.js");

const commentRouter = express.Router();

commentRouter.post("/:postId", protect, addComment);
commentRouter.delete("/:commentId", protect, deleteComment);
commentRouter.put("/:commentId", protect, updateComment);
commentRouter.get("/:commentId", allCommentsByPost);

module.exports = commentRouter;
