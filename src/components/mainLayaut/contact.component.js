import React from "react";
import { useContext } from "react";
import { BlogContext } from "../../store/blogContext";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { Toaster } from "react-hot-toast";
// import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { MDBInput } from "mdb-react-ui-kit";

const ContactForm = () => {
  const { contact, inputChange, changeContentHelper } = useContext(BlogContext);
  console.log(contact);

  async function sendMsg(contact) {
    if (!contact.name && contact.name.length < 3) {
      return toast.error("Enter valid Username!");
    }
    if (!contact.email && contact.email.length < 3) {
      return toast.error("Enter valid Email!");
    }

    try {
      const response = await fetch("http://localhost:3001/inbox", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(contact),
      });

      // const response = await api.signIn(formData);
      if (!response.ok) {
        throw new Error("Failed to send message. Please try again.");
      }
      const data = await response.json();
    } catch (error) {
      console.error("Error during sending message:", error.message);
      throw new Error("Failed to send message. Please try again.");
    }
  }

  const { isError, mutate } = useMutation({
    mutationKey: ["contactForm"],
    mutationFn: sendMsg,
    onSuccess: () => {
      toast.success("Message is send!");
    }
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    mutate(contact);
    if(isError){
      toast.error("Failed to send message!")
    }
  };

  return (
    <div
      style={{
        paddingLeft: "6rem",
        height: "25rem",
        // width:"100%",
        background: "#d8d8d8",
        opacity: "1",
        borderRadius: "0.5rem",
      }}
    >
      <Toaster />
      <section className="mb-4">
        <h2
          className="h1-responsive font-weight-bold text-start my-4"
          style={{ marginLeft: "6rem" }}
        >
          Contact me
        </h2>

        <div className="row">
          <div className="col-md-9 mb-md-0 mb-5">
            <form
              id="contact-form"
              name="contact-form"
              // action="mail.php"
              method="POST"
              // onSubmit={handleSubmit}
            >
              <div className="row">
                <div className="col-md-6">
                  <div className="md-form mb-0">
                    <MDBInput
                      type="text"
                      id="name"
                      name="name"
                      className="form-control"
                      value={contact.name}
                      onChange={inputChange}
                      required
                    ></MDBInput>
                    <label for="name" class="">
                      Your name
                    </label>
                  </div>
                </div>

                <div className="col-md-6">
                  <div className="md-form mb-0">
                    <input
                      type="text"
                      id="email"
                      name="email"
                      className="form-control"
                      value={contact.email}
                      onChange={inputChange}
                      required
                    ></input>
                    <label for="email" class="">
                      Your email
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="md-form mb-0">
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      className="form-control"
                      value={contact.subject}
                      onChange={inputChange}
                      required
                    ></input>
                    <label for="subject" class="">
                      Subject
                    </label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="md-form">
                    <textarea
                      type="text"
                      id="message"
                      name="message"
                      rows="2"
                      className="form-control md-textarea"
                      value={contact.message}
                      onChange={inputChange}
                      required
                    ></textarea>
                    <label for="message">Your message</label>
                  </div>
                </div>
              </div>

              <div className="row">
                <div className="col-md-12">
                  <div className="md-form">
                    <div
                      id="date-picker-example"
                      className="md-form md-outline input-with-post-icon datepicker"
                      inline="true"
                    >
                      <input
                        placeholder="Select date"
                        type="date"
                        id="example"
                        className="form-control"
                        name="date"
                        value={contact.date}
                        onChange={inputChange}
                        required
                      ></input>
                      {/* <label for="example">
                        <i className="fas fa-calendar input-prefix"></i>
                      </label> */}
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <div
              className="text-center text-md-left"
              style={{ marginTop: "0.5rem" }}
            >
              <button
                type="submit"
                onClick={handleSubmit}
                className="btn btn-secondary"
              >
                Send
              </button>
            </div>
            <div className="status"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactForm;
