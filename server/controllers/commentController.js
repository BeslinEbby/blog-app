const commentModel = require("../models/commentModel");

const addComment = async (req, res) => {
   try {
      const { content } = req.body;
      const { postId } = req.params;
      const { userId } = req.user;

      const post = await postModel.findById(postId);
      if (!post) return res.status(404).json({ success: false, message: "Post not found" });

      const comment = new commentModel({
         content,
         author: userId,
         post: postId,
      });

      await comment.save();

      await postModel.findByIdAndUpdate(postId, { $inc: { commentCount: 1 } });

      res.status(201).json({ success: true, message: "Comment added successfully", comment });
   } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
      console.error("error on add comment : ", error);
   }
};

const deleteComment = async (req, res) => {
   const { commentId } = req.params;
   const { userId } = req.user;
   try {
      const comment = await commentModel.findById(commentId);
      if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });

      if (comment.author !== userId) {
         return res.status(403).json({ success: false, message: "Not authorized" });
      }

      await comment.deleteOne();
      await postModel.findByIdAndUpdate(comment.post, { $inc: { commentCount: -1 } });

      res.status(200).json({ success: true, message: "Comment deleted" });
   } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
      console.error("error on delete comment :", error);
   }
};

const updateComment = async (req, res) => {
   try {
      const { content } = req.body;
      const { commentId } = req.params;

      const comment = await commentModel.findByIdAndUpdate(commentId, { content }, {new: true});
      if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });

      res.status(200).json({ success: true, message: "comment updates successfully", comment });
   } catch {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
      console.error("error on update comment :", error);
   }
};

const allCommentsByPost = async (req, res) => {
   try {
      const { postId } = req.params;
      const comments = await commentModel.find({ post: postId }).populate("author", "name email")

      res.status(200).json({ success: true, message: "all comments fetched", comments });
   } catch (error) {
      res.status(500).json({ success: false, message: "Server error", error: error.message });
      console.error("error on find comments by post : ", error);
   }
};

module.exports = {
   addComment,
   deleteComment,
   updateComment,
   allCommentsByPost
};
