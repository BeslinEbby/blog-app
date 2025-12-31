const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const app = express();

dotenv.config()
connectDB()

app.use(express.json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
   res.send("<h1>Server Running Successfully</h1>"); 
});

const port = process.env.PORT || 4000;
app.listen(port, () => {
   console.log(`server started on http://localhost:${port}`);
});
