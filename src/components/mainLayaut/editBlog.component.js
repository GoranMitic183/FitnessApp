import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useState, useContext } from "react";
import { editBlog } from "../../query/blogsQuery";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../query/blogsQuery";
import { useNavigate } from "react-router-dom";
import { BlogContext } from "../../store/blogContext";
import { Toaster, toast } from "react-hot-toast";

const EditBlog = () => {
  // const oldBlog = Object.values(props);
  const navigate = useNavigate();

  const { changeContentHelper, selectedBlog, singleBlogSeter } =
    useContext(BlogContext);

  const [formData, setBlogData] = useState({
    id: selectedBlog._id,
    title: selectedBlog.title,
    description: selectedBlog.description,
    content: selectedBlog.content,
  });

  console.log(formData);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBlogData({ ...formData, [name]: value });
  };
 
  const { mutate } = useMutation({
    mutationKey: ["editBlog"],
    mutationFn: editBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getBlogsKey"] });
      navigate("/home");
      singleBlogSeter(formData);
      toast.success("Blog is edited!");
      changeContentHelper("blog")
    },
    onError: () => {
      toast.error("Error!Try again.");
    },
  });

  const handleEditBlog = (e) => {
    e.preventDefault();
    mutate(formData);
  };

  const handleEditBack = () => {
    changeContentHelper("blog");
  };

  return (
    <div>
      <div>
        <div>
          <div
            style={{
              // margin: "2rem",
              // height: "100%",
              padding: "15px",
              // maxWidth: "450px",
              alignContent: "center",
              marginTop: "2rem",
              margin: "3rem 0",
            }}
          >
            <Toaster />
            <MDBCard alignment="center" style={{ opacity: "1", backgroundColor: "#373737", color: "#d8d8d8" }}>
              <MDBIcon fas icon="user-circle" className="fa-2x" />
              <h5>Edit blog</h5>
              <MDBCardBody>
                <MDBValidation
                  onSubmit={handleEditBlog}
                  noValidate
                  className="row g-3"
                >
                  <div className="col-md-12">
                    <MDBInput
                      label="Title"
                      type="text"
                      value={formData.title}
                      name="title"
                      onChange={handleInputChange}
                      required
                      // invalid
                      validation="Please provide title"
                    />
                  </div>
                  <div className="col-md-12">
                    <MDBInput
                      label="Description"
                      type="text"
                      value={formData.description}
                      name="description"
                      onChange={handleInputChange}
                      required
                      // invalid
                      validation="Please provide description"
                    />
                  </div>

                  <div className="col-md-12">
                    <MDBInput
                      placeholder="Enter your content here..."
                      cols="35"
                      label="Content"
                      type="text"
                      value={formData.content}
                      name="content"
                      onChange={handleInputChange}
                      required
                      // invalid
                      validation="Please provide content"
                    />
                  </div>

                  <div className="col-12" style={{display: "flex"}}>
                    <MDBBtn
                      className="btn btn-dark mt-2"
                      style={{ marginRight: "0.5rem", width: "100%" }}
                    >
                      Edit
                    </MDBBtn>
                    <MDBBtn
                  className="btn btn-secondary mt-2"
                  style={{ marginRight: "0.5rem", width: "100%" }}
                  onClick={handleEditBack}
                >
                  Back
                </MDBBtn>
                  </div>
                </MDBValidation>
               
              </MDBCardBody>
            </MDBCard>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditBlog;
