import axios from "axios";

export async function deleteMessageHandler(id) {
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
  };

 export async function getMessages() {
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
        // setMessage(inboxMessages.messagesInbox)
        return inboxMessages;
      }
    } catch (error) {
      console.log(error);
      throw new Error("Failed to find messages. Please try again.");
    }
  }

