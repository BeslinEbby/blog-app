const postModel = require("../models/postModel");
const cloudinary = require("../config/cloudinary");

const createPost = async (req, res) => {
    const { title, content } = req.body;
    const userId=req.user.userId

    if(!title){
        return res.status(400).json({success:false, message: "title required"})
    }

   try {
      let imageUrl = "";
      
      if (req.file) {
         const result = await cloudinary.uploader.upload(`data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`);
         imageUrl = result.secure_url;
      }
      
      const post = new postModel({
         title,
         content,
         coverImage: imageUrl,
         author: userId,
      });

      await post.save();
      res.status(201).json({ success: true, message: "post created successfully" });
   } catch (error) {
       res.status(500).json({ success: false, message: "Server error", error: error.message });
       console.log("error on create post : ", error);
   }
};

const updatePost = async (req, res) => {
    const postId=req.params.postId
    const userId=req.user.userId
    const {title, content}=req.body
   try {
      const post = await postModel.findById(postId);
      if (!post) return res.status(404).json({ success: false, message: "Post not found" });

      if (post.author!== userId) {
         return res.status(403).json({ success: false, message: "Not authorized" });
      }

      post.title = title || post.title;
      post.content = content || post.content;
      
      if (req.file) {
         const result = await cloudinary.uploader.upload(
            `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`
         );
         const imageUrl = result.secure_url;
         post.coverImage =  imageUrl
      }else{
        post.coverImage=post.coverImage
      }

      await post.save();
      res.status(200).json({ success: true, message: "post updated successfully", post });
   } catch (error) {
       res.status(500).json({ success: false, message: "Server error", error: error.message });
       console.error("error on update post : ", error);
   }
};

module.exports={
    createPost,
    updatePost
}