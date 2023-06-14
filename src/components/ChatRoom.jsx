import React, { useEffect, useState } from "react";
import "./ChatRoom.css";
import axios from "axios";

const ChatRoom = () => {
  const [users, setUsers] = useState([]);
  const [sender, setSender] = useState();
  const [receiver, setReceiver] = useState();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  useEffect(() => {
    setSender(localStorage.getItem("_id"));

    axios
      .get("http://localhost:7070/api/users")
      .then((res) => setUsers(res.data.users))
      .catch((err) => setUsers(err.response.data.message));
  }, []);

  useEffect(() => {
    if (sender && receiver && newMessage === "") {
      console.log("break");
      axios
        .post("http://localhost:7070/api/messages/two", { sender, receiver })
        .then((res) => {
          console.log(res.data.messages);
          setMessages(res.data.messages);
        });
    }
  }, [sender, receiver, newMessage]);

  const sendMessage = () => {
    if (newMessage !== "") {
      axios
        .post("http://localhost:7070/api/message/new", {
          sender,
          receiver,
          message: newMessage,
        })
        .then((res) => console.log(res.data))
        .catch((err) => console.log(err.response.data.message));
      setNewMessage("");
    }
  };

  return (
    <div className="chatRoomContainner">
      <div className="contactList">
        {users.map((user) => (
          <div
            style={receiver === user._id ? { backgroundColor: "red" } : {}}
            onClick={() => setReceiver(user._id)}
            key={user._id}
          >
            {user.name}
          </div>
        ))}
      </div>
      <div className="chatSection">
        <div className="inputMessage">
          {receiver ? (
            <>
              <input
                onChange={(e) => setNewMessage(e.target.value)}
                type="text"
                value={newMessage}
              />
              <button onClick={sendMessage}>send</button>
            </>
          ) : (
            <div>No Chats</div>
          )}
        </div>
        <div className="messages">
          {messages.map((message) => (
            <div key={message._id}>{message.message}</div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChatRoom;
