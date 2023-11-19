import React from "react";
import { useContext } from "react";
import { BlogContext } from "../../store/blogContext";
import { toast } from "react-hot-toast";
import { queryClient } from "../../query/blogsQuery";
import { deleteBlog } from "../../query/blogsQuery";
import { useMutation } from "@tanstack/react-query";

const ReadMoreBlog = (data) => {
  // const data = props;
  const { selectedBlog, changeContentHelper, admin, singleBlogSeter, blogsData } =
    useContext(BlogContext);

  const handleEditBlog = (id) => {
    const blogId = blogsData.blogs.find((blog) => blog._id === id);
    singleBlogSeter(blogId);
    changeContentHelper("editblog");
  };

  const mutation = useMutation({
    mutationKey: ["deleteBlog"],
    mutationFn: (id) => deleteBlog(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getBlogsKey"] });
    },
  });

  const handleDeleteBlog = (id) => {
    mutation.mutate(id);
    toast.success("Blog is deleted!");
  };

  const handleBack = () => {
    changeContentHelper("blog");
  };

  return (
    <div style={{background: "#d8d8d8"}}>
      <div>
        <h2>{selectedBlog.title}</h2>
        <p>{selectedBlog.content}</p>
      </div>
      <button
        className="btn btn-dark"
        style={{ marginRight: "0.5rem" }}
        onClick={handleBack}
      >
        Back
      </button>
      {admin && (
        <button
          className="btn btn-dark"
          style={{ marginRight: "0.5rem" }}
          onClick={() => handleEditBlog(selectedBlog._id)}
        >
          Edit
        </button>
      )}
      {admin && (
        <button
          className="btn btn-dark"
          style={{ marginRight: "0.5rem" }}
          onClick={() => handleDeleteBlog(selectedBlog._id)}
        >
          Delete
        </button>
      )}
    </div>
  );
};

export default ReadMoreBlog;
