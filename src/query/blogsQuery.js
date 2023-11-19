import axios from "axios";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export async function getBlogs() {
  const url = "http://localhost:3001/blogs";
  try {
    const response = await axios.get(url);
    // console.log(response.data.blogs);
    return response.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    throw error;
  }
}

export async function postNewBlog(formData) {
  const url = "http://localhost:3001/blogs";
  console.log(formData);
  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return response.json();
  } catch (error) {
    console.error("Error posting blog:", error);
    throw error;
  }
}

export async function editBlog(formData) {

    const id = formData.id;

  const url = `http://localhost:3001/blogs/${id}`;

  try {
    const response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });
    return response.json();
  } catch (error) {
    console.error("Error editing blog:", error);
    throw error;
  }
}

export async function deleteBlog(id) {
  
    const url = `http://localhost:3001/blogs/${id}`;
console.log(id);
    try {
        const response = await fetch(url, {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
            },
          });
          return response.json();
    } catch (error) {
        console.error("Error deleting blog:", error);
    throw error;
    }
}
