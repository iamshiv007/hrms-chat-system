import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import ChatIcon from "../assets/ChatIcon.ico";
import "./Chatbox.css";
import io from "socket.io-client";
const socket = io.connect("http://localhost:7070");

const Chatbox = () => {
  const [isChatBox, setIsChatBox] = useState(false);
  const [messages, setMessages] = useState([]);
  const [users, setUsers] = useState([]);
  const [message, setMessage] = useState("");
  const [sender, setSender] = useState();
  const [senderName, setsenderName] = useState("");
  const [receiver, setReceiver] = useState();

  useEffect(() => {
    setSender(sessionStorage.getItem("_id"));
    setsenderName(sessionStorage.getItem("name"));

    axios
      .get("http://localhost:7070/api/users")
      .then((res) => {
        setUsers(res.data.users);
      })
      .catch((err) => console.log(err.response.data.message));

    if (receiver && receiver !== "") {
      axios
        .post("http://localhost:7070/api/messages/two", {
          sender: sessionStorage.getItem("_id"),
          receiver,
        })
        .then((res) => {
          setMessages(res.data.messages);
        });
    }
  }, [receiver]);

  const sendMessage = (e) => {
    if (e.key === "Enter" && message !== "") {
      if (!receiver || receiver === "") {
        return alert("Select a receiver");
      }

      axios
        .post("http://localhost:7070/api/message/new", {
          sender,
          receiver,
          message,
        })
        .then((res) => {
          socket.emit("send message", {
            message,
            sender: { _id: sender, name: senderName },
            receiver,
          });
          setMessage("");
        })
        .catch((err) => console.log(err.response.data.message));
    }
  };

  useEffect(() => {
    if (message === "") {
      socket.on("message", (payload) => {
        if (
          sender === payload.sender._id ||
          (sender === payload.receiver &&
            sessionStorage.getItem("receiver") === payload.sender._id)
        ) {
          setMessages([...messages, payload]);
        }
        if (sender === payload.receiver) {
          return alert(`New Message From ${payload.sender.name}`);
        }
      });
    }
  });

  return (
    <Fragment>
      <div className="chatButton" onClick={() => setIsChatBox(!isChatBox)}>
        <img style={{ width: "40px" }} src={ChatIcon} alt="" />
      </div>

      <div
        className="chatbox"
        style={isChatBox ? { display: "block" } : { display: "none" }}
      >
        <div className="chatHeader">
          <div>
            <img style={{ width: "20px" }} src={ChatIcon} alt="" />
          </div>
          <div>
            Inbox{" "}
            <span>
              <select
                onChange={(e) => {
                  setReceiver(e.target.value);
                  sessionStorage.setItem("receiver", e.target.value);
                }}
                name="users"
                id=""
              >
                <option value="">Select</option>
                {users
                  .filter((user) => user._id !== sender)
                  .map((user, key) => (
                    <option key={key} value={user._id}>
                      {user.name}
                    </option>
                  ))}
              </select>
            </span>
          </div>
        </div>

        <div>
          <div className="chatings">
            {messages.map((message, key) =>
              sender !== message.sender._id ? (
                <div key={key} className="chat">
                  <p className="name">{message.sender.name}</p>
                  <div>
                    <div className="avatar">
                      {message.sender.name.split("")[0]}
                    </div>
                    <p className="message">{message.message}</p>
                  </div>
                </div>
              ) : (
                <div key={key} className="senderChat">
                  <div>
                    <p className="message">{message.message}</p>
                  </div>
                </div>
              )
            )}
          </div>
          <div className="inputBox">
            <input
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={sendMessage}
              placeholder="Reply here..."
              type="text"
              value={message}
            />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Chatbox;
