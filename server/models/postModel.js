const mongoose= require("mongoose");

const postSchema = new mongoose.Schema(
   {
      title: { type: String, required: true },
      content: { type: String},
      coverImage: { type: String, default: "" },
      author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
      likes: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
      commentsCount: { type: Number, default: 0 },
   },
   { timestamps: true }
);

const postModel = mongoose.model("Post", postSchema);

module.exports= postModel;
