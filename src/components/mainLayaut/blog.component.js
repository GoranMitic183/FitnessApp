import { useQuery } from "@tanstack/react-query";
import React, { useContext, useEffect, useState } from "react";
import { getBlogs } from "../../query/blogsQuery";
import classes from "./blog.module.css";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { BlogContext } from "../../store/blogContext";
import SingleBlog from "./singleBlog.component";
import SearchFilter from "./searchFilter.component";

export const Blog = () => {
  const { allBlogsSetter, filterData, filterDataHandler } =
    useContext(BlogContext);
  // const [filteredData, setFilteredData] = useState([]);

  const { isPending, data, isSuccess } = useQuery({
    queryKey: ["getBlogsKey"],
    queryFn: () => getBlogs(),
    onError: (error) => {
      toast.error(`Can't find blogs!`);
    },
  });

  if (data) {
    filterDataHandler(data.blogs);
    // setFilteredData(data.blogs)
  }

  if (isSuccess) {
    allBlogsSetter(data);
  }

  // useEffect(()=>{
  //   filterDataHandler(filterData)
  // },[filterData])

  return (
    <div
      className={classes.container}
      style={{ opacity: "1", borderRadius: "0.5rem" }}
    >
      <Toaster toastOptions={{ style: { marginTop: "2rem" } }} />
      <SearchFilter data={data} />
<hr></hr>
      {isPending && <p>Loading blogs...</p>}
      {filterData &&
        filterData.map((blog) => {
          return <SingleBlog key={blog._id} {...blog} />;
        })}
      <div>
      </div>
    </div>
  );
};
