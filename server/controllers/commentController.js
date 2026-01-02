const commentModel = require("../models/commentModel");

const addComment = async (req, res) => {
   try {
      const { content } = req.body;
      const { postId } = req.params;

      const post = await postModel.findById(postId);
      if (!post) return res.status(404).json({ success: false, message: "Post not found" });

      const comment = new commentModel({
         content,
         author: req.user._id,
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

module.exports= {
    addComment 
}