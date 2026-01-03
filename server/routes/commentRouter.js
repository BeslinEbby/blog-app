const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { addComment, deleteComment } =require("../controllers/commentController.js");

const commentRouter = express.Router();

commentRouter.post("/:postId", protect, addComment);
commentRouter.post("/:commentId", protect, deleteComment);

module.exports = commentRouter;
