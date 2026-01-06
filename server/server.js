const express = require("express");
const dotenv = require("dotenv").config();;
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const userRouter = require("./routes/authRoutes");
const postRouter = require("./routes/postRoutes");
const commentRouter  = require("./routes/commentRouter");

const app = express();


connectDB();

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api/auth", userRouter);
app.use("/api/posts", postRouter);
app.use("/api/posts/comments", commentRouter);

app.get("/", (req, res) => {
   res.send("<h1>Server Running Successfully</h1>"); 
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
   console.log(`server started on http://localhost:${port}`);
});
