const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const blogSchema = new Schema(
  {
    title: { type: String, require: true },
    description: { type: String, require: true },
    content: { type: String, require: true },
  },
  { collection: "blogs" }
);

const Blog = mongoose.model("blogSchema", blogSchema);

module.exports = Blog;
