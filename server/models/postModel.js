const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema(
   { 
      url: { type: String, default: "" }, 
      cloudinaryId: { type: String } 
   },
   { _id: false }
);

const postSchema = new mongoose.Schema(
   {
      title: { type: String, required: true },
      content: { type: String },
      coverImage: imageSchema,
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      commentsCount: { type: Number, default: 0 },
   },
   { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);

module.exports = postModel;
