const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "laksndsfoihLKHDSGGNOI@LK#J2o32jrnwekjsnkvsd";
let User = require("./models/user.model");

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://0.0.0.0:27017/clients", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});
// app.use("/", usersRouter);

app.post("/register", async (req, res) => {
    const { username, password, email } = req.body;
    if (!username || typeof username != "string") {
      return res.json({ status: "error", error: "Invalid username" });
    }
    if (!email || typeof email != "string") {
      return res.json({ status: "error", error: "Invalid email" });
    }
    if (password.length < 8) {
      return res.json({ status: "error", error: "Invalid password" });
    }
    const hpassword = await bcrypt.hash(password, 10);
    try {
      const response = await User.create({ username, hpassword, email });
      console.log("User je kreiran: ", response);
    } catch (error) {
      if (error.code === 11000) {
        return res.json({ status: "error", error: "Username exist" });
      }
      console.log(error);
      throw error;
    }
    res.json({ status: "ok" });
  });
  
  app.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await User.findOne({ username }).lean();
  
    if (!user) {
      return res.json({ status: "error", error: "Invalid username/password" });
    }
    if (await bcrypt.compare(password, user.hpassword)) {
      const token = jwt.sign(
        {
          id: user._id,
          username: user.username,
        },
        JWT_SECRET
      );
      return res.json({ status: "ok", token: token });
    } else {
      res.json({ status: "error", error: "Invalid username/password" });
    }
  });



app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
