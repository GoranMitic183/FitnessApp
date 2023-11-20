import React, { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useContext } from "react";
import { BlogContext } from "../../store/blogContext";
import { queryClient } from "../../query/blogsQuery";
import { deleteMessageHandler } from "../../query/messagesQuery";
import toast from "react-hot-toast";

const Messages = () => {
  const [messageId, setMessageId] = useState(null);
  const { messages } = useContext(BlogContext);
  const [isAllMessages, setIsAllMessages] = useState(true);

  const { mutate } = useMutation({
    mutationKey: ["deleteMessage"],
    mutationFn: (id) => deleteMessageHandler(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getMessage"] });
    },
    onError: () => {
      toast.error("Failed to delete message!Try again!");
    },
  });

  const handleReadMessage = (id) => {
    const messageId = messages.find((message) => message._id === id);
    setIsAllMessages(false);
    setMessageId(messageId);
  };

  const handleBack = () => {
    setIsAllMessages(true);
    setMessageId(null);
  };

  const handleDelete = (id) => {
    mutate(id);
  };

  return (
    <div style={{overflow: "scroll", maxHeight: "40rem"}}>
      {messages.length === 0 && <p>No messages in inbox!</p>}
      {messages.length > 0 && isAllMessages && (
        <ul>
          {messages.map((message) => {
            return (
              <div >
                <li key={message._id}>
                  <div>
                    <span>
                      <strong style={{ fontSize: "1.3rem" }}>
                        {message.name}
                      </strong>
                    </span>
                    <div>
                    Email: {message.email}
                    </div>
                  </div>
                  <div>
                    <p>Subject: {message.subject}</p>
                  </div>
                  <p>{message.date}</p>
                  <div className="cart-item-actions">
                    <button
                      className="btn btn-outline-secondary"
                      style={{ marginRight: "0.5rem" }}
                      onClick={() => handleReadMessage(message._id)}
                    >
                      Read
                    </button>
                    <button
                      className="btn btn-outline-secondary"
                      onClick={() => handleDelete(message._id)}
                    >
                      Delete
                    </button>
                  </div>
                </li>
                <hr></hr>
              </div>
            );
          })}
        </ul>
      )}
      {!isAllMessages && (
        <div style={{maxWidth: "30rem"}}>
          <p>{messageId.message}</p>
          <hr></hr>
          <button className="btn btn-outline-secondary" onClick={handleBack}>
            Back
          </button>
        </div>
      )}
      <p id="cart-total-price"></p>
    </div>
  );
};

export default Messages;
