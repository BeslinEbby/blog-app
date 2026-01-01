const postModel = require("../models/postModel");

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

module.exports=createPost