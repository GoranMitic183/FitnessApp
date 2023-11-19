import React from "react";
import { useContext } from "react";
import { BlogContext } from "../../store/blogContext";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { deleteBlog } from "../../query/blogsQuery";
import { queryClient } from "../../query/blogsQuery";

const SingleBlog = ({ _id, title, description }) => {



  const { changeContentHelper, singleBlogSeter, admin, blogsData } =
    useContext(BlogContext);

    console.log(blogsData);

  const handleReadMore = (id) => {
    const blogId = blogsData.blogs.find((blog) => blog._id === id);
    singleBlogSeter(blogId);
    changeContentHelper("readmore");
  };

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
    mutation.mutate(id, {
      onSuccess: () => {
        toast.success("Blog is deleted!");
      },
      onError: (error) => {
        toast.error(`Error deleting blog: ${error.message}`);
      },
    });
  };
  return (
    <div key={_id}>
      <div>
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <button
        className="btn btn-secondary"
        style={{ marginRight: "0.5rem" }}
        onClick={() => handleReadMore(_id)}
      >
        Read more...
      </button>
      {admin && (
        <button
          className="btn btn-secondary"
          style={{ marginRight: "0.5rem" }}
          onClick={() => handleEditBlog(_id)}
        >
          Edit
        </button>
      )}
      {admin && (
        <button
          className="btn btn-secondary"
          style={{ marginRight: "0.5rem" }}
          onClick={() => handleDeleteBlog(_id)}
        >
          Delete
        </button>
      )}
      <hr></hr>
    </div>
  );
};

export default SingleBlog;
