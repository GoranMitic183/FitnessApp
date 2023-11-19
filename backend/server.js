const express = require("express");
const cors = require("cors");
// import morgan from 'morgan'
const morgan = require("morgan");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const JWT_SECRET = "laksndsfoihLKHDSGGNOI@LK#J2o32jrnwekjsnkvsd";
let User = require("./models/user.model");
let Program = require("./models/trainingProgram.model");
let Blog = require("./models/blog.model");
let Inbox = require("./models/inbox.model")
const app = express();
const port = process.env.PORT || 3001;

// const corsOptions = {
//   origin: "*",
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//   credentials: true, // Enable credentials (cookies, authorization headers, etc.)
// };

app.use(morgan("dev"));
app.use(express.json({ limit: "30mb", extended: true }));
app.use(express.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());

mongoose.connect("mongodb://0.0.0.0:27017/clients", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully");
});



app.post("/register", async (req, res) => {
  const { firstName, lastName, password, email } = req.body;
  console.log(password);
  if (!firstName && !lastName) {
    return res.json({ status: "error", error: "Invalid username" });
  }
  if (!email) {
    return res.json({ status: "error", error: "Invalid email" });
  }
  if (password.length < 8) {
    return res.json({ status: "error", error: "Invalid password" });
  }
  try {
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const hpassword = await bcrypt.hash(password, 10);

    const user = await User.create({ firstName, lastName, hpassword, email});
    console.log("User is created: ", user);

    return res.status(200).json({ user });
  } catch (error) {
    res.status(500).json({ status: "error", error: "Failed to register!" });
    console.log(error);
  }
});


app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const oldUser = await User.findOne({ email });

if (!oldUser){
      return res.status(404).json({ message: "User doesn't exist" });
}
      const isPasswordCorrect = bcrypt.compare(password, oldUser.hpassword);
      if (!isPasswordCorrect){
      return res.status(400).json({ message: "Invalid credentials" });
      }
      // const token = jwt.sign()
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, JWT_SECRET, {
        expiresIn: "1h",
      });
      console.log(token);
      //rola dodavanje
      res.status(200).json({ user: oldUser, token , role: oldUser.role});

  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
    console.log(error);
  }
});

app.get("/training", async (req, res) => {
  const response = await Program.find({});
  console.log(response);
  if (!response || response.length === 0) {
    return res.json({ status: "error", error: "Cant find any data!" });
  }
  return res.json({ status: "ok", data: response });
});

// app.post('/buy', async (req, res) => {

// });

app.post("/blogs", async (req, res) => {
  const { title, description, content } = req.body;

  try {
    const blog = await Blog.create({ title, description, content });
    return res.status(201).json({ status: "created" });
  } catch (error) {
    if (error) {
      console.error("Error creating blog:", error);
      return res
        .status(500)
        .json({ status: "error", message: "Blog failed to create!" });
    }
  }
});

app.get("/blogs", async (req, res) => {
  try {
    const blogs = await Blog.find();
    return res.status(200).json({ status: "ok", blogs: blogs });
  } catch (error) {
    if (error) {
      console.error("Error fetching blogs:", error);
      return res
        .status(500)
        .json({ error: error, message: "Failed to find blogs!" });
    }
  }
});

app.put("/blogs/:id", async (req, res) => {
  const { id, title, description, content } = req.body;
  console.log(id);
  try {
    if (!id || !title || !description || !content) {
      return res.status(400).json({
        status: "error",
        message: "Invalid data provided for updating the blog.",
      });
    }
    const blog = await Blog.findByIdAndUpdate(id, {
      title,
      description,
      content,
    });

    if (!blog) {
      return res
        .status(404)
        .json({ status: "error", message: "Blog not found." });
    }

    return res.status(200).json({ status: "success", data: blog });
  } catch (error) {
    console.error("Error updating blog:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to update blog." });
  }
});

app.delete("/blogs/:id", async (req, res) => {
  const { id } = req.params;
  try {
    if (!id) {
      return res.status(400).json({
        status: "error",
        message: "Invalid data provided for deleting the blog.",
      });
    }
    await Blog.findByIdAndDelete(id);
    res.status(200).json({message:"Blog is deleted"})
  } catch (error) {
    console.error("Error deleting blog:", error);
    return res
      .status(500)
      .json({ status: "error", message: "Failed to delete blog." });
  }
});

app.post("/inbox", async (req, res) => {
  const {name, email, subject, message, date} = req.body;
  try {
    const inboxMsg = await Inbox.create({name, email, subject, message, date});
    return res.status(200).json({message: "Message was sent!"})
  } catch (error) {
    res.status(500).json({ status: "error", error: "Failed to sent message!" });
  }
})

app.get("/inbox", async (req, res) => {
  try {
    const messages = await Inbox.find();
    return res.status(200).json({ status: "ok", messagesInbox: messages });
  } catch (error) {
    if (error) {
      console.error("Error fetching messages:", error);
      return res
        .status(500)
        .json({ error: error, message: "Failed to find messages!" });
    }
  }
})

app.delete("/inbox", async (req, res) => {
  const { id } = req.body;
  try {
   const response = await Inbox.findByIdAndDelete(id);
    return res.status(200).json({status: "ok", message: "Message is deleted!"})
  } catch (error) {
    return res.status(500).json({error:error})
  }
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
