const express = require("express");
const protect = require("../middlewares/authMiddleware");
const { addComment } =require("../controllers/commentController.js");

const commentRouter = express.Router();

commentRouter.post("/:postId", protect, addComment);

module.exports = commentRouter;
