import { createContext, useState, children } from "react";
import axios from "axios";
// import { queryClient } from "../query/blogsQuery";
// import { deleteMessageHandler } from "../query/messagesQuery";
// import { getMessages } from "../query/messagesQuery";

export const BlogContext = createContext({
  content: "",
  messages: [],
  contact: {
    name: "",
    email: "",
    subject: "",
    message: "",
    date: "",
  },
  selectedBlog: null,
  blogsData: [],
  admin: false,
  changeContentType: () => {},
  changeContentHelper: () => {},
  inputChange: () => {},
  allMessages: () => {},
  singleBlogSeter: () => {},
  adminCheck: () => {},
  allBlogsSetter: () => {},
  getMessagesQuery: () => {},
  deleteMessageQuery: () => {},

});

export default function BlogContextProvider({ children }) {
  const [message, setMessage] = useState([]);
  const [allBlogs, setAllBlogs] = useState([]);
  const [isContent, setIsContent] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    date: "",
  });
  const [singleBlog, setSingleBlog] = useState({});
  const [isAdmin, setIsAdmin] = useState(false);

  const handleContent = (e) => {
    const contentType = e.target?.innerText.toLowerCase();
    setIsContent(contentType);
  };

  const handleChangeContentHelper = (content) => {
    setIsContent(content);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const allMessagesHandler = (allMessages) => {
    setMessage(allMessages);
  };

  const setSingleBlogFn = (blog) => {
    setSingleBlog(blog);
  };

  const adminHandler = (admin) => {
    setIsAdmin(admin);
  };

  const allBlogsHandler = (data) => {
    setAllBlogs(data);
  };

  async function deleteMessageHandler(id) {
    try {
      const response = await axios.delete("http://localhost:3001/inbox", {
        headers: {
          "Content-Type": "application/json",
        },
        data: { id },
      });
      if (response.status === 200) {
        const data = response.data;
        return data;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to find messages. Please try again.");
    }
  }

  async function getMessages() {
    try {
      const response = await fetch("http://localhost:3001/inbox", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const inboxMessages = await response.json();
        // console.log(inboxMessages);
        setMessage(inboxMessages.messagesInbox);
        return inboxMessages;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to find messages. Please try again.");
    }
  }

  const ctxValue = {
    content: isContent,
    contact: formData,
    messages: message,
    selectedBlog: singleBlog,
    admin: isAdmin,
    blogsData: allBlogs,
    changeContentType: handleContent,
    changeContentHelper: handleChangeContentHelper,
    inputChange: handleInputChange,
    allMessages: allMessagesHandler,
    singleBlogSeter: setSingleBlogFn,
    adminCheck: adminHandler,
    allBlogsSetter: allBlogsHandler,
    getMessagesQuery: getMessages,
    deleteMessageQuery: deleteMessageHandler,
  };

  return (
    <BlogContext.Provider value={ctxValue}>{children}</BlogContext.Provider>
  );
}
