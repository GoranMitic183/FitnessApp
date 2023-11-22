import React from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBInput,
  MDBValidation,
  MDBBtn,
  MDBIcon,
} from "mdb-react-ui-kit";
import { useState } from "react";
import { postNewBlog } from "../../query/blogsQuery";
import { useMutation } from "@tanstack/react-query";
import { queryClient } from "../../query/blogsQuery";
import { useContext } from "react";
import { BlogContext } from "../../store/blogContext";
import { toast } from "react-hot-toast"

const NewBlog = () => {
  const [formData, setLoginData] = useState({
    title: "",
    description: "",
    content: ""
  });

  const {content, changeContentHelper } = useContext(BlogContext)


  const mutation = useMutation({
    mutationKey: ["addBlog"],
    mutationFn: postNewBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({queryKey: ['getBlogsKey']});
      changeContentHelper("blog")
      toast.success("New blog added successfuly!")
    }
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData({ ...formData, [name]: value });
  };

  const handleAddBlog = (e) => {
    e.preventDefault();
    mutation.mutate(formData)
  }

  return (
    <div>
      <div>
        <div
          style={{
            maxHeight: "100%",
            // margin: "1rem",
            // padding: "0.5rem",
            // maxWidth: "450px",
            alignContent: "center",
            // marginTop: "0.5rem",
          }}
        >
          <MDBCard alignment="center" style={{ opacity: "1" ,backgroundColor: "#373737", color: "#d8d8d8"}}>
            <MDBIcon fas icon="user-circle" className="fa-2x" />
            <h5>Add new blog</h5>
            <MDBCardBody>
              <MDBValidation
                onSubmit={handleAddBlog}
                noValidate
                className="row g-3"
              >
                <div className="col-md-12">
                  <MDBInput
                    // label="Title"
                    placeholder="Title"
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
                    // label="Description"
                    placeholder="Description"
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
                  placeholder="Enter your message here..."
                  cols="35"
                    // label="Content"
                    type="text"
                    value={formData.content}
                    name="content"
                    onChange={handleInputChange}
                    required
                    // invalid
                    validation="Please provide content"
                  />
                </div>

                <div className="col-12">
                  <MDBBtn style={{ width: "40%" }} className="btn btn-secondary">
                    Add
                  </MDBBtn>
                </div>
              </MDBValidation>
            </MDBCardBody>
          </MDBCard>
        </div>
      </div>
    </div>
  );
};

export default NewBlog;
