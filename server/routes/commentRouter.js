const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { addComment, deleteComment, updateComment } =require("../controllers/commentController.js");

const commentRouter = express.Router();

commentRouter.post("/:postId", protect, addComment);
commentRouter.delete("/:commentId", protect, deleteComment);
commentRouter.put("/:commentId", protect, updateComment);

module.exports = commentRouter;
