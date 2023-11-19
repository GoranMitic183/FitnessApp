import { useQuery } from "@tanstack/react-query";
import React, { useContext } from "react";
import { getBlogs } from "../../query/blogsQuery";
import classes from "./blog.module.css";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { BlogContext } from "../../store/blogContext";
import SingleBlog from "./singleBlog.component";

export const Blog = () => {
  const { allBlogsSetter } = useContext(BlogContext);

  const { isPending, data, isSuccess } = useQuery({
    queryKey: ["getBlogsKey"],
    queryFn: () => getBlogs(),
    onError: (error) => {
      toast.error(`Can't find blogs!`);
    },
  });

  if (isSuccess) {
    allBlogsSetter(data);
  }

  return (
    <div
      className={classes.container}
      style={{ opacity: "0.9", borderRadius: "0.5rem" }}
    >
      <Toaster toastOptions={{style:{marginTop: '2rem'}}}/>
      {isPending && <p>Loading blogs...</p>}
      {data &&
        data.blogs.map((blog) => {
          return <SingleBlog key={blog._id} {...blog} />;
        })}
      <div></div>
    </div>
  );
};
