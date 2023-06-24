import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import ChatIcon from "../assets/ChatIcon.ico";
import "./Chatbox.css";
import io from "socket.io-client";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers } from "../features/actions/userActions";
var socket;

const Chatbox = () => {
  const [isChatBox, setIsChatBox] = useState(false);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.user);
  const { users } = useSelector((state) => state.users);

  useEffect(() => {
    socket = io.connect("https://hrms-backend-iamshiv007.vercel.app");
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    setReceiver(sessionStorage.getItem("receiver"));

    if (receiver && receiver !== "") {
      axios
        .post("https://hrms-backend-iamshiv007.vercel.app/api/messages/two", {
          sender: user?._id,
          receiver: sessionStorage.getItem("receiver"),
        })
        .then((res) => {
          console.log(res.data.messages);
          setMessages(res.data.messages);
        });
    }
  }, [receiver, user?._id]);

  const sendMessage = (e) => {
    if (e.key === "Enter" && message !== "") {
      if (!receiver || receiver === "") {
        return alert("Select a receiver");
      }

      console.log({
        sender: user?._id,
        senderName: user.fullName,
        receiver,
        message,
      });

      axios
        .post("https://hrms-backend-iamshiv007.vercel.app/api/message/new", {
          sender: user?._id,
          senderName: user?.fullName,
          receiver,
          message,
        })
        .then((res) => {
          socket.emit("send message", {
            message,
            sender: user?._id,
            senderName: user?.fullName,
            receiver,
          });
          setMessage("");
        })
        .catch((err) => console.log(err.response.data.message));
    }
  };

  useEffect(() => {
    socket.on("message", (payload) => {
      console.log("run");
      if (
        user?._id === payload.sender ||
        (user?._id === payload.receiver &&
          sessionStorage.getItem("receiver") === payload.sender)
      ) {
        setMessages([...messages, payload]);
      }
    });
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
              <UsersComp
                users={users}
                setReceiver={setReceiver}
                receiver={receiver}
                user={user}
              />
            </span>
          </div>
        </div>

        <div>
          <Chatings messages={messages} user={user} />

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

const UsersComp = ({ users, setReceiver, receiver, user }) => {
  return (
    <select
      onChange={(e) => {
        setReceiver(e.target.value);
        sessionStorage.setItem("receiver", e.target.value);
      }}
      name="users"
      id=""
      value={receiver}
    >
      <option value="">Select</option>
      {users
        .filter((oneuser) => oneuser?._id !== user?._id)
        .map((oneuser, key) => (
          <option key={key} value={oneuser?._id}>
            {oneuser.fullName}
          </option>
        ))}
    </select>
  );
};

const Chatings = ({ messages, user }) => {
  return (
    <div className="chatings">
      {messages.map((message, key) =>
        user?._id !== message.sender ? (
          <div key={key} className="chat">
            <p className="name">{message.senderName}</p>
            <div>
              <div className="avatar">{message.senderName.split("")[0]}</div>
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
  );
};
